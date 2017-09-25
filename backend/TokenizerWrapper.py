import spacy

nlp = spacy.load('en')

def tokenize(text):
  doc = nlp.tokenizer(text)
  tokens = list()
  for token in doc:
    tokens.append(token.text)

  return tokens

