import config from '../config/config';
const url = config[process.env.NODE_ENV].api;

var axios = require('axios');

// API Documents static class
export default class ApiDocuments {

  // -----------------------------------------------------
  // get a list of documents
  // -----------------------------------------------------
  static getList() {
    return axios.get(url + '/documents')
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // add/edit a document
  // -----------------------------------------------------
  static addEdit(document) {
    if (document.id) {
      return axios.put(url + '/documents/' + document.id, document)
        .then(response => {
          return response.data;
        });
    }

    // add a new document
    return axios.post(url + '/documents/', document)
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // delete a document
  // -----------------------------------------------------
  static delete(documentId) {
    return axios.delete(url + '/documents/' + documentId)
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // get document tokens
  // -----------------------------------------------------
  static getTokens(documentId) {
    return axios.get(url + '/documents/' + documentId + '/tokens')
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // set token label
  // -----------------------------------------------------
  static setTokenLabel(token, label) {
    let new_token = { ...token }
    new_token.label = label;

    return axios.put(url + '/tokens/' + token.id, new_token)
      .then(response => {
        return response.data;
      });
  }
}
