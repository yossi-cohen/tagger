const sampleText = 
"When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously.\
\
“I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week.\
\
A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";

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
            documentText: sampleText,
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
