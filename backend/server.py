import uuid

import elasticsearch
from elasticsearch_dsl import Q
from flask import Flask, jsonify, request
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename

from backend import FileUtils
from backend.DatabaseModel import Document, Labels, Tokens
from backend.FileUtils import allowed_file, get_current_datetime
from backend.TokenizerWrapper import tokenize

DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S.%f%Z'

app = Flask(__name__)


def hits_to_docs(hits, include_text = None):
  result = []
  for hit in hits:
    dict = hit.to_dict()
    doc = {
      'id': hit.meta.id,
      'name': dict.get('name', ''),
      'tags': dict.get('tags', []),
      'created': dict.get('created', get_current_datetime()).strftime(DATETIME_FORMAT),
      'modified': dict.get('modified', get_current_datetime()).strftime(DATETIME_FORMAT)
    }
    if include_text:
      doc['text'] = dict.get('text', '')
    result.append(doc)
  return result


def get_document_internal(document_id, include_text = None):
  doc = Document.get(id = document_id)
  dict = doc.to_dict()

  doc = {
    'id': doc.meta.id,
    'name': dict.get('name', ""),
    'tags': dict.get('tags', []),
    'created': dict.get('created', get_current_datetime()).strftime(DATETIME_FORMAT),
    'modified': dict.get('modified', get_current_datetime()).strftime(DATETIME_FORMAT),
  }

  if include_text:
    doc['text'] = dict.get('text', '')
  return doc


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
  doc = Document(meta = {'id': new_id},
                 name = filename,
                 text = text,
                 tags = tags,
                 created = get_current_datetime(),
                 modified = get_current_datetime())
  doc.save()

  tokens = tokenize(text)

  tokensDoc = Tokens(meta = {'id': new_id})
  tokensDoc.entityTokens = tokens
  tokensDoc.save()

  labels = list()
  for token in tokens:
    labels.append("")

  labelsDoc = Labels(meta = {'id': new_id})
  labelsDoc.entityLabels = labels
  labelsDoc.save()

  return jsonify(get_document_internal(new_id))


@app.route('/documents/<string:document_id>', methods = ['GET'])
def get_document(document_id):
  return jsonify(get_document_internal(document_id))


@app.route('/documents/<string:document_id>', methods = ['PUT'])
def rename_document(document_id):
  doc_name = request.args.get('name')
  doc = Document.get(id = document_id)
  doc['name'] = doc_name
  doc['modified'] = get_current_datetime()
  doc.save()

  return jsonify(get_document_internal(document_id))


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
  order = request.args.get('order','desc')
  page = request.args.get('page')
  pageSize = request.args.get('pageSize')
  tags = request.args.getlist('tags')

  search = Document.search()
  for tag in tags:
    search = search.filter('term', tags=tag)

  if sortBy:
    if sortBy == 'name':
      sortBy = sortBy+".keyword"
    search = search.sort(
      {sortBy: {"order": order}}
    )

  hits = search.execute()
  result = hits_to_docs(hits)
  return jsonify(result)


@app.route('/documents/search', methods = ['GET'])
def search_document():
  query = request.args.get('query', '')
  is_search_text = request.args.get('searchText', '')
  page = request.args.get('page', 0)
  page_size = request.args.get('pageSize', 100)

  fields = ["name"]
  if is_search_text and is_search_text.lower() == "True".lower():
    fields.append("text")

  if len(request.args) == 0:
    hits = Document.search().query("match_all").execute()
  else:
    hits = Document.search().query("query_string", fields = fields, query = query).execute()
  result = hits_to_docs(hits, include_text = True)
  return jsonify(result)


@app.route('/documents/<string:document_id>/text', methods = ['GET'])
def get_document_text(document_id):
  doc = get_document_internal(document_id, include_text = True)
  return jsonify(doc['text'])


@app.route('/documents/<string:document_id>/tokens', methods = ['GET'])
def get_document_tokens(document_id):
  tokens = Tokens.get(id=document_id)
  tokenList = list()
  tokenList.extend(tokens['entityTokens'])
  return jsonify(tokenList)


@app.route('/documents/<string:document_id>/entities/labels', methods = ['GET'])
def get_document_entity_labels(document_id):
  labels = Labels.get(id=document_id)
  labelList = list()
  labelList.extend(labels['entityLabels'])
  return jsonify(labelList)


@app.route('/documents/<string:document_id>/<int:token_index>/entities/labels', methods = ['GET'])
def get_token_entity_labels(document_id, token_index):
  labels = Labels.get(id = document_id)
  return labels.entityLabels[token_index]


@app.route('/documents/<string:document_id>/<int:token_index>/entities/labels', methods = ['PUT'])
def set_token_entity_labels(document_id, token_index):
  label = request.args.get('label','NA')

  labels = Labels.get(id = document_id, ignore=404)
  if not labels:
    labels = Labels(meta = {'id': document_id}, entityLabels = [])
  labels['entityLabels'][token_index] = label
  labels.save()
  return "OK"


@app.route('/documents/<document_id>/<token_index>/entities/labels', methods = ['DELETE'])
def delete_token_entity_labels(document_id, token_index):

  labels = Labels.get(id = document_id, ignore=404)
  if not labels:
    labels = Labels(meta = {'id': document_id}, entityLabels = [])
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
  Document.init()
  Labels.init()
  Tokens.init()
  app.run(port = 12000, debug = True)
