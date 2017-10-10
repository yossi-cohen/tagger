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
- export VENV=~/virtualenv
- export APP=tagger
- sudo apt install -y python3-pip python-virtualenv
- rm -rf ${VENV} 
- mkdir ${VENV} 
- either:
  - python2:
    - virtualenv --no-site-packages ${VENV}/${APP}
  - python3:
    - virtualenv -p python3 --no-site-packages ${VENV}/${APP}
- cd ${VENV}/${APP}/bin
- source activate
- do your stuff...
  - pip3 install Spacy
  - pip3 install flask
  - pip3 install elasticsearch_dsl
  - pip3 install tika
  - pip3 install flask-cors

- deactivate

