from elasticsearch  import Elasticsearch
from elasticsearch_dsl import DocType, Date, Integer, Keyword, Text
from elasticsearch_dsl.connections import connections

connections.create_connection(hosts=['localhost'])



class Document(DocType):
  name = Text()
  body = Text()
  created = Date()
  modified = Date()

  class Meta:
    index = 'documents'







