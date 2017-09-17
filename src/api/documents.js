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
}
