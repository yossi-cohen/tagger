#!/bin/bash
docker run -d -p 9200:9200 --name es -e "http.host=0.0.0.0" -e "transport.host=127.0.0.1" elasticsearch

