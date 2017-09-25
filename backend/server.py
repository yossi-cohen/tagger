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

  tokensDoc = db.Tokens(meta = {'id': new_id})
  tokensDoc.entityTokens = tokens
  tokensDoc.save()

  labels = list()
  for token in tokens:
    labels.append("")

  labelsDoc = db.Labels(meta = {'id': new_id})
  labelsDoc.entityLabels = labels
  labelsDoc.save()

  return jsonify(db.Document.get(new_id).to_json())


@app.route('/documents/<string:document_id>', methods = ['GET'])
def get_document(document_id):
  return jsonify(db.Document.get(document_id).to_json())


@app.route('/documents/<string:document_id>', methods = ['PUT'])
def rename_document(document_id):
  doc_name = request.args.get('name')
  doc = db.Document.get(id = document_id)
  doc['name'] = doc_name
  doc['modified'] = db.get_current_datetime()
  doc.save()

  return jsonify(doc.to_json())


@app.route('/documents/<string:document_id>', methods = ['DELETE'])
def delete_document(document_id):
  try:
    Document(meta = {'id': document_id}).delete()
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
  tokens = db.Tokens.get(id = document_id)
  tokenList = list()
  tokenList.extend(tokens['entityTokens'])
  return jsonify(tokenList)


@app.route('/documents/<string:document_id>/entities/labels', methods = ['GET'])
def get_document_entity_labels(document_id):
  labels = db.Labels.get(id = document_id)
  labelList = list()
  labelList.extend(labels['entityLabels'])
  return jsonify(labelList)


@app.route('/documents/<string:document_id>/<int:token_index>/entities/labels', methods = ['GET'])
def get_token_entity_labels(document_id, token_index):
  labels = db.Labels.get(id = document_id)
  return labels.entityLabels[token_index]


@app.route('/documents/<string:document_id>/<int:token_index>/entities/labels', methods = ['PUT'])
def set_token_entity_labels(document_id, token_index):
  label = request.args.get('label', 'NA')

  labels = db.Labels.get(id = document_id, ignore = 404)
  if not labels:
    labels = db.Labels(meta = {'id': document_id}, entityLabels = [])
  labels['entityLabels'][token_index] = label
  labels.save()
  return "OK"


@app.route('/documents/<document_id>/<token_index>/entities/labels', methods = ['DELETE'])
def delete_token_entity_labels(document_id, token_index):
  labels = db.Labels.get(id = document_id, ignore = 404)
  if not labels:
    labels = db.Labels(meta = {'id': document_id}, entityLabels = [])
  labels['entityLabels'][token_index] = ""
  labels.save()
  return "OK"


@app.route('/documents/<document_id>/entities', methods = ['GET'])
def get_document_entities(document_id):
  pass


@app.route('/documents/<document_id>/entities/mentions', methods = ['GET'])
def get_document_mentions(document_id):
  pass


if __name__ == '__main__':
  db.Document.init()
  db.Labels.init()
  db.Tokens.init()
  app.run(port = 12000, debug = True)
