import config from '../config/config';
const url = config[process.env.NODE_ENV].api + '/tokens';

// API Documents static class
export default class ApiDocuments {
  // get a list of documents
  static getList() {
    return new Promise(resolve => {
      setTimeout(() => {
        // build some dummy documents list
        let documents = [];
        for (let x = 1; x <= 28; x++) {
          documents.push({
            id: x,
            documentName: 'Document-' + x,
            documentText: '',
          });
        }
        resolve(documents);
      }, 1000);
    });
  }

  // add/edit a document
  static addEdit() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 1000);
    });
  }

  // delete a document
  static delete() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 500);
    });
  }

  // lilo: get document tokens
  static getTokens(documentId) {
    return new Promise(reject, resolve => {
      fetch(url, {})
      .then(response => {
          return response.json()
      })
      .then(json => {
        resolve(json.tokens);
      })
      .catch(err => reject(err))
    });
  }
}
