import assert from "assert";
import documents from "../../src_documents/reducers/documents";

// unit tests for the documents reducers
// mocha - http://mochajs.org/#getting-started
// assert - https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message
describe('Documents reducer', () => {
  describe('USERS_LIST_SAVE', () => {
    it('should return a list of documents', () => {
      assert.deepEqual(
        documents({}, {
          type: 'USERS_LIST_SAVE',
          documents: [{
            id: 1,
            documentName: 'Some name',
          }],
        }), [{
          id: 1,
          documentName: 'Some name',
        }]
      );
    });
  });

  describe('USERS_ADD_SAVE', () => {
    it('should return a new document array element', () => {
      assert.deepEqual(
        documents([{
          id: 1,
          documentName: 'Some name',
        }], {
          type: 'USERS_ADD_SAVE',
          document: {
            id: 2,
            documentName: 'Other name',
          },
        }), [{
          id: 1,
          documentName: 'Some name',
        }, {
          id: 2,
          documentName: 'Other name',
        }]
      );
    });
  });

  describe('USERS_EDIT_SAVE', () => {
    it('should return an edited document array element', () => {
      assert.deepEqual(
        documents([{
          id: 1,
          documentName: 'Some name',
        }, {
          id: 2,
          documentName: 'Other name',
        }], {
          type: 'USERS_EDIT_SAVE',
          document: {
            id: 2,
            documentName: 'Changed name',
          },
        }), [{
          id: 1,
          documentName: 'Some name',
        }, {
          id: 2,
          documentName: 'Changed name',
        }]
      );
    });
  });

  describe('USERS_DELETE_SAVE', () => {
    it('should return the document array without the deleted element', () => {
      assert.deepEqual(
        documents([{
          id: 1,
          documentName: 'Some name',
        }, {
          id: 2,
          documentName: 'Other name',
        }], {
          type: 'USERS_DELETE_SAVE',
          document_id: 2,
        }), [{
          id: 1,
          documentName: 'Some name',
        }]
      );
    });
  });
});
