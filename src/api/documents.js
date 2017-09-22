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
  static addEdit() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 1000);
    });
  }

  // -----------------------------------------------------
  // delete a document
  // -----------------------------------------------------
  static delete() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 500);
    });
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
