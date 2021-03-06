import uuid

import elasticsearch
from flask import Flask, jsonify, request
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename

from backend import FileUtils
import backend.DatabaseModel as db
from backend.FileUtils import *
from backend.TokenizerWrapper import tokenize

DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S.%f%Z'

app = Flask(__name__)





def get_pagination_params(page, pageSize):
  if not page:
    page = 0

  if not pageSize:
    pageSize = 100

  page, pageSize = int(page), int(pageSize)

  from_index = page * pageSize
  to_index = ((page + 1) * pageSize)
  return from_index, to_index


@app.route('/documents', methods = ['POST'])
def insert_document():
  text = ''
  filename = ''
  tags = []

  if 'file' in request.files:
    file = request.files['file']

    if file.filename == '':
      return abort(400, 'No selected file')

    if file and allowed_file(file.filename):
      filename = secure_filename(file.filename)
      text = FileUtils.parse_file(file)
    else:
      return abort(400, "Illegal File Format")

  if request.is_json:
    json = request.get_json()
    text = json.get('text', text)
    filename = json.get('name', filename)
    tags = json.get('tags', tags)

  new_id = uuid.uuid4()
  doc = db.Document(meta = {'id': new_id},
                 name = filename,
                 text = text,
                 tags = tags,
                 created = db.get_current_datetime(),
                 modified = db.get_current_datetime())
  doc.save()

  tokens = tokenize(text)
  db.Token().save_tokens(tokens=tokens, documentId = new_id)

  return jsonify(db.Document.get(new_id).to_json())


@app.route('/documents/<string:document_id>', methods = ['GET'])
def get_document(document_id):
  return jsonify(db.Document.get(document_id).to_json())





@app.route('/documents/<string:document_id>', methods = ['PUT'])
def update_document(document_id):
  doc_name = request.args.get('name')
  doc = db.Document.get(id = document_id)
  if doc_name:
    doc['name'] = doc_name
  if request.is_json:
    json = request.get_json()
    text = json.get('text')
    if text:
      db.Token().delete_tokens(document_id)
      doc['text'] = text
      tokens = tokenize(text)
      db.Token().save_tokens(tokens = tokens, documentId = document_id)

  doc['modified'] = db.get_current_datetime()
  doc.save()

  return jsonify(doc.to_json())


@app.route('/documents/<string:document_id>', methods = ['DELETE'])
def delete_document(document_id):
  try:
    db.Document(meta = {'id': document_id}).delete()
  except elasticsearch.exceptions.NotFoundError:
    pass
  return "{} DELETED".format(document_id)


@app.route('/documents', methods = ['GET'])
def get_documents():
  sortBy = request.args.get('sortBy')
  order = request.args.get('order', 'desc')
  from_index, to_index = get_pagination_params(request.args.get('page'), request.args.get('pageSize'))
  tags = request.args.getlist('tags')

  search = db.Document.search()
  for tag in tags:
    search = search.filter('term', tags = tag)

  if sortBy:
    if sortBy == 'name':
      sortBy = sortBy + ".keyword"
    search = search.sort(
      {sortBy: {"order": order}}
    )

  hits = search[from_index:to_index]
  result = db.search_hits_to_jsons(hits)
  return jsonify(result)


@app.route('/documents/search', methods = ['GET'])
def search_document():
  query = request.args.get('query', '')
  is_search_text = request.args.get('searchText', '')
  from_index, to_index = get_pagination_params(request.args.get('page'), request.args.get('pageSize'))

  fields = ["name"]
  if is_search_text and is_search_text.lower() == "True".lower():
    fields.append("text")

  if len(request.args) == 0:
    hits = db.Document.search().query("match_all").execute()
  else:
    hits = db.Document.search().query("query_string", fields = fields, query = query)[from_index:to_index]
  result = db.search_hits_to_jsons(hits, include_text = True)
  return jsonify(result)


@app.route('/documents/<string:document_id>/text', methods = ['GET'])
def get_document_text(document_id):
  doc = db.Document.get(document_id).to_json(include_text = True)
  return jsonify(doc['text'])


@app.route('/documents/<string:document_id>/tokens', methods = ['GET'])
def get_document_tokens(document_id):
  tokens = db.Token.search().filter('term', documentId=document_id).sort({
    "index": {
      "order": "asc"
    }
  }).execute()

  return jsonify(list(map(lambda x: x.to_json(), tokens)))


@app.route('/documents/<string:document_id>/entities/labels', methods = ['GET'])
def get_document_entity_labels(document_id):
  tokens = db.Token.search().filter('term', documentId=document_id).sort({
    "index": {
      "order": "asc"
    }
  }).execute()

  return jsonify(list(map(lambda x: x['label'],tokens)))


@app.route('/documents/<string:document_id>/tokens/<string:token_id>', methods = ['GET'])
def get_token(document_id,token_id):
  token = db.Token.get(id=token_id)
  if token.documentId != document_id:
    return abort(400, "token id doesnt match document id")

  return jsonify(token.to_json())


@app.route('/documents/<string:document_id>/<int:token_index>/entities/labels', methods = ['GET'])
def get_token_entity_labels(document_id, token_index):
  tokens = db.Token.search().filter('term', documentId = document_id).filter('term', index=token_index).sort({
    "index": {
      "order": "asc"
    }
  }).execute()
  return jsonify(list(map(lambda x: x['label'],tokens))[0])


@app.route('/documents/<string:document_id>/<int:token_index>/entities/labels', methods = ['PUT'])
def set_token_entity_labels(document_id, token_index):
  tokens = db.Token.search().filter('term', documentId = document_id).filter('term', index=token_index).sort({
    "index": {
      "order": "asc"
    }
  }).execute()

  token=tokens[0]
  token.label = request.args.get('label',"NA")
  token.save()
  return jsonify(token.to_json())


@app.route('/documents/<document_id>/<token_index>/entities/labels', methods = ['DELETE'])
def delete_token_entity_labels(document_id, token_index):
  tokens = db.Token.search().filter('term', documentId = document_id).filter('term', index=token_index).sort({
    "index": {
      "order": "asc"
    }
  }).execute()

  token=tokens[0]
  token.label = "NA"
  token.save()
  return jsonify(token.to_json())


@app.route('/documents/<document_id>/entities', methods = ['GET'])
def get_document_entities(document_id):
  pass


@app.route('/documents/<document_id>/entities/mentions', methods = ['GET'])
def get_document_mentions(document_id):
  pass


if __name__ == '__main__':
  db.Document.init()
  db.Token.init()
  app.run(port = 12000, debug = True)
