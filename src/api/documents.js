import config from '../config/config';
const url = config[process.env.NODE_ENV].api;

// API Documents static class
export default class ApiDocuments {

  // -----------------------------------------------------
  // get a list of documents
  // -----------------------------------------------------
  static getList() {
    return fetch(url + '/documents', {})
      .then(response => {
        return response.json()
      });
  }

  // -----------------------------------------------------
  // add/edit a document
  // -----------------------------------------------------
  static addEdit(document) {
    if (document.id) {
      return fetch(url + '/documents/' + document.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
      })
        .then(response => { return response.json() });
    }

    // add a new document
    return fetch(url + '/documents/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(document)
    })
      .then(response => { return response.json() });
  }

  // -----------------------------------------------------
  // delete a document
  // -----------------------------------------------------
  static delete(documentId) {
    return fetch(url + '/documents/' + documentId, {
      method: 'DELETE'
    })
      .then(response => { return response.json() });
  }

  // -----------------------------------------------------
  // get document tokens
  // -----------------------------------------------------
  static getTokens(documentId) {
    return fetch(url + '/documents/' + documentId + '/tokens', {})
      .then(response => {
        return response.json();
      });
  }

  // -----------------------------------------------------
  // set token label
  // -----------------------------------------------------
  static setTokenLabel(token, label) {
    let new_token = { ...token }
    new_token.label = label;

    return fetch(url + '/tokens/' + token.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_token)
    })
      .then(response => { return response.json() });
  }
}
