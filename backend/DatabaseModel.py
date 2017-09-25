from datetime import datetime

from elasticsearch_dsl import Date, DocType, Integer, Keyword, Text
from elasticsearch_dsl.connections import connections

DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S.%f%Z'

connections.create_connection(hosts = ['localhost'])


def search_hits_to_jsons(hits, include_text = None):
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


def get_current_datetime():
  # return datetime.now(pytz.utc)
  return datetime.now()


class Document(DocType):
  name = Text(fields = {'keyword': Keyword()})
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

  def to_json(self, include_text = None):
    doc = {
      'id': self.meta.id,
      'name': self.name,
      'tags': list(self.tags),
      'created': self.created if self.created else get_current_datetime().strftime(DATETIME_FORMAT),
      'modified': self.modified if self.modified else get_current_datetime().strftime(DATETIME_FORMAT),
    }

    if include_text:
      doc['text'] = self.text
    return doc

  class Meta:
    index = 'documents'


class Tokens(DocType):
  documentId = Keyword()
  tokenzier = Keyword()
  entityTokens = Text()

  class Meta:
    index = 'tokens'

  def save(self, using = None, index = None, validate = True, **kwargs):
    self.tokenzier = 'spacy'
    return super().save(**kwargs)


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
