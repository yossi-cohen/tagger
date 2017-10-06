from datetime import datetime

from elasticsearch_dsl import Date, DocType, Integer, Keyword, Text
from elasticsearch_dsl.connections import connections
from elasticsearch import helpers

es = connections.create_connection(hosts = ['localhost'])

# -----------------------------------------------------
# helper methods
# -----------------------------------------------------

DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S.%f%Z'

def get_current_datetime():
  # return datetime.now(pytz.utc)
  return datetime.now()

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


# -----------------------------------------------------
# Document
# -----------------------------------------------------

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
      'tags': list(self.tags) if None != self.tags else [],
      'created': self.created if self.created else get_current_datetime().strftime(DATETIME_FORMAT),
      'modified': self.modified if self.modified else get_current_datetime().strftime(DATETIME_FORMAT),
    }

    if include_text:
      doc['text'] = self.text
    return doc

  class Meta:
    index = 'documents'

# -----------------------------------------------------
# Token
# -----------------------------------------------------

class Token(DocType):
  documentId = Keyword()
  tokenzier = Keyword()
  index = Integer()
  token = Keyword()
  label = Keyword()

  class Meta:
    index = 'tokens'

  def save(self, using = None, index = None, validate = True, **kwargs):
    self.tokenzier = 'spacy'
    return super().save(**kwargs)

  def save_tokens(self, tokens, documentId):
    index = 0
    actions = []
    for token in tokens:
      actions.append(Token(documentId = documentId, index=index, token=token, label="NA").to_dict(include_meta = True))
      index+=1
    helpers.bulk(es, actions)

  def delete_tokens(self, documentId):
    tokens = self.search().filter('term', documentId = documentId).execute()

    actions = []
    for token in tokens:
      action = token.to_dict(include_meta = True)
      action['_op_type'] = 'delete'
      actions.append(action)
    helpers.bulk(es, actions)

  def to_json(self):
    dict = {
      'id': self.meta.id,
      'documentId': self.documentId,
      'tokenizer': 'spacy',
      'index': self.index,
      'token': self.token,
      'label': self.label
    }

    return dict

# -----------------------------------------------------
# Mention
# -----------------------------------------------------

class Mention(DocType):
  mentionId = Keyword()
  entityId = Keyword()
  documentId = Keyword()
  label = Keyword()
  tokens = Integer()

  class Meta:
    index = 'mentions'

# -----------------------------------------------------
# Entity
# -----------------------------------------------------

class Entity(DocType):
  entityId = Keyword()
  documentId = Keyword()
  label = Keyword()
  mentions = Keyword()

  class Meta:
    index = 'entities'
