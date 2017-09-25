from elasticsearch_dsl import Date, DocType, InnerObjectWrapper, Keyword, Nested, Text, Integer
from elasticsearch_dsl.connections import connections

connections.create_connection(hosts = ['localhost'])


class Document(DocType):
  name = Text(fields={'keyword': Keyword()})
  text = Text()
  created = Date()
  modified = Date()
  tags = Keyword()

  def add_tag(self, tag):
    self.tags.append(tag)

  def add_tags(self, tags):
    self.tags.extend(tags)

  def remove_tag(self, tag):
    self.tags.remove(tag)

  class Meta:
    index = 'documents'




class Tokens(DocType):
  documentId = Keyword()
  tokenzier = Keyword()
  entityTokens = Text()

  class Meta:
    index = 'tokens'

class Labels(DocType):
  documentId = Keyword()
  entityLabels = Keyword()

  class Meta:
    index = 'labels'


class Mention(DocType):
  mentionId = Keyword()
  entityId = Keyword()
  documentId = Keyword()
  label = Keyword()
  tokens = Integer()

  class Meta:
    index = 'mentions'


class Entity(DocType):
  entityId = Keyword()
  documentId = Keyword()
  label = Keyword()
  mentions = Keyword()

  class Meta:
    index = 'entities'
