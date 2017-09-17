# tagger
## *entities/relations tagger*
- Add text documents
- Label tokens as entities.
- Label relations between entities

## *configurable*

- configure the tokenizer to use
- configure list of entity labels
- configure list of relation labels

## *REST API*

### get document-metadata by id
```
GET /documents/<doc-id>

returns: {
    id: <document-id>,
    name: <document-name>,
    created: <creation-date>,
    modified: <modification-date>,
}
```

### add document (index + tokenize)
```
POST /documents

body: {
    name: <document-name>   // validate name
    text: <document text>   // validate text
}
```

### rename document
```
PUT /document/<doc-id>
    ?name=<new-name>        // validate name
```

### delete document
```
DELETE /document/<doc-id>
```

### get documents 
<br/>paged, sorted
```
GET /documents
    ?sortBy=<name/created/modified/etc.>
    &order=<ascending/descending/none>
    &page=<number>
    &pageSize=<number>

returns: [{
    id: <document-id>,
    name: <document-name>,
    created: <creation-date>,
    modified: <modification-date>,
}]
```

### search documents
<br/>paged, sorted
```
GET /documents/search
    ?query=<query string>
    &searchText<true/false>
    &page=<number>
    &pageSize=<number>

returns: [{
    id: <document-id>,
    name: <document-name>,
    created: <creation-date>,
    modified: <modification-date>,
}]
```

### get document text
```
GET /documents/<doc-id>/text

returns: '<document-text>'
```

### get document tokens
```
GET /documents/<doc-id>/tokens

returns ['<tokens>']
```

### get document entity-labels
```
GET /documents/<doc-id>/entities/labels

returns ['<label>']   // e.g., ['NA', 'Person', 'NA', ...] same length as tokens-array
```

### get token-entity-labels
```
GET /documents/<doc-id>/<token-index>/entities/labels

returns '<label>'
```

### set token-entity-label
<br/>implicitly supports add/delete label
```
PUT /document/<doc-id>/<token-index>/entities/labels
    ?label='<label>'
```

### get entities
```
GET /documents/<doc-id>/entities
NOTE: entities have one or more mentions in the document

returns [{
    id: '<entity-id>',
    documentId: '<document-id>',
    label: '<label>', // e.g., 'Person'
    mentions: ['<mention-ids>'] // e.g., [1101,2001,3000]
}]
```

### get entity-mentions
```
GET /documents/<doc-id>/entities/mentions
NOTE: mentions may have relations with other mentions (e.g., Person X works-for Organization Y)

returns [{
    id: '<mention-id>',
    documentId: '<document-id>',
    entityId: '<entity-id>',
    label: '<label>', // e.g., 'Person'
    tokensIndices: ['<token-indices>'] // e.g., [11,12,13]
}]
```

## *Data Model*

```
documentMetadata = {
    id: '<document-id>',
    name: '<document-name>',
    created: '<creation-date>',
    modified: '<modification-date>',
}

document = {
    documentId: '<document-id>',
    text: '<document text>',
}
    
tokens = {
    documentId: '<document-id>',
    tokens: ['<literals>']
}

labels = {
    documentId: '<document-id>',
    entityLabels: ['<literals>'] // same length as tokens-array
}

entity = {
    id: '<entity-id>',
    documentId: '<document-id>',
    label: '<label>',
    mentions: ['<mention-id>']
}

mention = {
    id: '<mention-id>',
    entityId: '<entity-id>',
    documentId: '<document-id>',
    label: '<label>',
    tokens: ['<token-indices>']
}
```

## TODO
- rename document in-place
- add tag-entities button
- mock API calls
- prototype tag-entities page
- prototype relations page

