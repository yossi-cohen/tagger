import assert from "assert";
import documents from "../../src/reducers/documents";

// unit tests for the documents reducers
// mocha - http://mochajs.org/#getting-started
// assert - https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message
describe('Documents reducer', () => {
  describe('DOCUMENTS_LIST_SAVE', () => {
    it('should return a list of documents', () => {
      assert.deepEqual(
        documents({}, {
          type: 'DOCUMENTS_LIST_SAVE',
          documents: [{
            id: 1,
            documentName: 'Some name',
            documentText: '',
          }],
        }), [{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }]
      );
    });
  });

  describe('DOCUMENTS_ADD_SAVE', () => {
    it('should return a new document array element', () => {
      assert.deepEqual(
        documents([{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }], {
          type: 'DOCUMENTS_ADD_SAVE',
          document: {
            id: 2,
            documentName: 'Other name',
            documentText: '',
          },
        }), [{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }, {
          id: 2,
          documentName: 'Other name',
          documentText: '',
        }]
      );
    });
  });

  describe('DOCUMENTS_EDIT_SAVE', () => {
    it('should return an edited document array element', () => {
      assert.deepEqual(
        documents([{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }, {
          id: 2,
          documentName: 'Other name',
          documentText: '',
        }], {
          type: 'DOCUMENTS_EDIT_SAVE',
          document: {
            id: 2,
            documentName: 'Changed name',
            documentText: '',
          },
        }), [{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }, {
          id: 2,
          documentName: 'Changed name',
          documentText: '',
        }]
      );
    });
  });

  describe('DOCUMENTS_DELETE_SAVE', () => {
    it('should return the document array without the deleted element', () => {
      assert.deepEqual(
        documents([{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }, {
          id: 2,
          documentName: 'Other name',
          documentText: '',
        }], {
          type: 'DOCUMENTS_DELETE_SAVE',
          document_id: 2,
        }), [{
          id: 1,
          documentName: 'Some name',
          documentText: '',
        }]
      );
    });
  });
});
