import spacy

nlp = spacy.load('en')


def tokenize_spacy(text):
  doc = nlp.tokenizer(text)
  tokens = list()
  for token in doc:
    tokens.append(token.text)

  return tokens



def tokenize(text):
  spacy = SpacyTokenizer()
  return spacy.tokenize(text)


class SpacyTokenizer():
  nlp = spacy.load('en')

  def tokenize(self,text):
    doc = nlp.tokenizer(text)
    tokens = list()
    for token in doc:
      tokens.append(token.text)

    return tokens
