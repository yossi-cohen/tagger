import uuid

import elasticsearch
from flask import Flask, flash, jsonify, request
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename
import json

from backend import FileUtils
from backend.Database import Document
from backend.FileUtils import allowed_file, get_current_datetime

DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S.%f%Z'

app = Flask(__name__)


@app.route('/documents', methods = ['GET'])
def list_documents():
  hits = Document.search().scan()
  result = []
  for hit in hits:
    dict = hit.to_dict()
    result.append({
      'id': hit.meta.id,
      'name': dict.get('name', ""),
      'created': dict.get('created', get_current_datetime()).strftime(DATETIME_FORMAT),
      'modified': dict.get('modified', get_current_datetime()).strftime(DATETIME_FORMAT),
    })
  return jsonify(result)


def get_document_internal(document_id):
  doc = Document.get(id = document_id)
  dict = doc.to_dict()

  return {
    'id': doc.meta.id,
    'name': dict.get('name', ""),
    'created': dict.get('created', get_current_datetime()).strftime(DATETIME_FORMAT),
    'modified': dict.get('modified', get_current_datetime()).strftime(DATETIME_FORMAT),
    'body': dict.get('body', ""),
  }


@app.route('/documents/<document_id>', methods = ['GET', 'DELETE', 'PUT'])
def get_document(document_id):
  if request.method == 'DELETE':
    try:
      Document(meta = {'id': document_id}).delete()
    except elasticsearch.exceptions.NotFoundError:
      pass
    return "{} DELETED".format(document_id)

  if request.method == 'PUT':
    doc_name = request.args.get('name')
    doc = Document.get(id = document_id)
    doc['name'] = doc_name
    doc['modified'] = get_current_datetime()
    doc.save()

  return jsonify(get_document_internal(document_id))


@app.route('/documents/<document_id>/text', methods = ['GET'])
def get_document_text(document_id):
  doc = get_document_internal(document_id)
  return jsonify(doc['body'])


@app.route('/documents', methods = ['POST'])
def insert_new_document():
  file = request.files['file']

  if file.filename == '':
    flash('No selected file')
  if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    text = FileUtils.parse_file(file)
    new_id = uuid.uuid4()
    doc = Document(meta = {'id': new_id},
                   name = filename,
                   body = text,
                   created = get_current_datetime(),
                   modified = get_current_datetime())
    doc.save()
    return jsonify(get_document_internal(new_id))
  return abort(400, "Illegal File Format")


if __name__ == '__main__':
  Document.init()
  app.run(port = 12000)
