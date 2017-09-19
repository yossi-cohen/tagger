from datetime import datetime

import pytz
from tika import parser

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'html', 'htm', 'xml'])


def allowed_file(filename):
  return '.' in filename and \
         filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def parse_file(file_path):
  parsedPdf = parser.from_file(filename = file_path)
  return parsedPdf['content']


def parse_file(file_buffer):
  parsedPdf = parser.from_buffer(file_buffer)
  return parsedPdf['content']


def get_current_datetime():
  return datetime.now(pytz.utc)
