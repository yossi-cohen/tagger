# tagger - backend - WIP
## Prerequisites
- Elasticsearch 5.6.0
- Python3.4+
- Python modules:
  - Spacy
  - flask
  - elasticsearch_dsl
  - tika
  - flask-cors
## Guide
- run elasticsearch locally
- run server.py

## Not implemented:
- Entities endpoints
- mentions endpoints

#Datamodel might not be final

#python virtualenv
- sudo apt install python3-pip
- rm -rf ~/virtualenv/ 
- mkdir ~/virtualenv/
- either:
  - python2:
    - virtualenv --no-site-packages ~/virtualenv/tagger
  - python3:
    - virtualenv -p python3 --no-site-packages ~/virtualenv/tagger
- cd ~/virtualenv/tagger/bin
- source activate
- do your stuff...
  - pip3 install Spacy
  - pip3 install flask
  - pip3 install elasticsearch_dsl
  - pip3 install tika
  - pip3 install flask-cors
- deactivate

