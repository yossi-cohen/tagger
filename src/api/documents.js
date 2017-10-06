import config from '../config/config';
const baseUrl = config[process.env.NODE_ENV].api;

var axios = require('axios');

// API Documents static class
export default class ApiDocuments {

  // -----------------------------------------------------
  // get a list of documents
  // -----------------------------------------------------
  static getList(page, pageSize, sortBy, order, tags) {
    let url = baseUrl + '/documents';

    url += '?page=' + (page ? page - 1 : 0);
    url += '&pageSize=' + (pageSize || 10);

    url += '&sortBy=' + (sortBy || 'name');
    url += '&order=' + (order || 'asc');

    if (tags && tags.length)
      url += '&tags=' + tags;

    return axios.get(url)
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // count documents
  // -----------------------------------------------------
  static count(tags) {
    let url = baseUrl + '/documents/count';

    if (tags && tags.length)
      url += '?tags=' + tags;

    return axios.get(url)
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // add/edit a document
  // -----------------------------------------------------
  static addEdit(document) {
    if (document.id) {
      return axios.put(baseUrl + '/documents/' + document.id, document)
        .then(response => {
          return response.data;
        });
    }

    // add a new document
    return axios.post(baseUrl + '/documents/', document)
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // delete a document
  // -----------------------------------------------------
  static delete(documentId) {
    return axios.delete(baseUrl + '/documents/' + documentId)
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // get document text
  // -----------------------------------------------------
  static getText(documentId) {
    return axios.get(baseUrl + '/documents/' + documentId + '/text')
      .then(response => {
        return response.data;
      });
  }

  // -----------------------------------------------------
  // get document tokens
  // -----------------------------------------------------
  static getTokens(documentId) {
    return axios.get(baseUrl + '/documents/' + documentId + '/tokens')
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

    return axios.put(baseUrl + '/documents/' + token.documentId + '/' + token.index + '/entities/labels', new_token)
      .then(response => {
        return response.data;
      });
  }
}
