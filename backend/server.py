import uuid

from flask import Flask, flash, jsonify, request
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename

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


@app.route('/documents/<document_id>', methods = ['GET', 'DELETE'])
def get_document(document_id):
  if request.method == 'DELETE':
    Document(meta={'id':document_id}).delete()
    return "{} DELETED".format(document_id)

  doc = Document.get(id = document_id)
  dict = doc.to_dict()

  return jsonify({
    'id': doc.meta.id,
    'name': dict.get('name', ""),
    'created': dict.get('created', get_current_datetime()).strftime(DATETIME_FORMAT),
    'modified': dict.get('modified', get_current_datetime()).strftime(DATETIME_FORMAT),
    'body': dict.get('body', ""),
  })


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
    return get_document(new_id)
  return abort(400, "Illegal File Format")


if __name__ == '__main__':
  Document.init()
  app.run(port = 12000)
