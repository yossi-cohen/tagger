import { call, put } from "redux-saga/effects";
import assert from "assert";
import ApiDocuments from "../../src/api/documents";
import { 
  documentsFetchList, 
  documentsAddEdit, 
  documentsDelete, 
  documentsGetTokens } from "../../src/sagas/documents";

// unit tests for the documents saga
describe('Documents saga', () => {
  describe('documentsFetchList()', () => {
    const generator = documentsFetchList();

    it('should return the ApiDocuments.getList call', () => {
      assert.deepEqual(generator.next().value, call(ApiDocuments.getList));
    });

    it('should return the DOCUMENTS_LIST_SAVE action', () => {
      assert.deepEqual(generator.next().value, put({type: 'DOCUMENTS_LIST_SAVE', documents: undefined}));
    });

    it('should be finished', () => {
      assert.equal(generator.next().done, true);
    });
  });

  describe('documentsAddEdit() - add', () => {
    const action = {
      document: {},
      callbackSuccess: () => {},
    };
    const generator = documentsAddEdit(action);

    it('should return the ApiDocuments.addEdit call', () => {
      assert.deepEqual(generator.next().value, call(ApiDocuments.addEdit));
    });

    it('should return the DOCUMENTS_ADD_SAVE action', () => {
      assert.deepEqual(generator.next().value, put({
        type: 'DOCUMENTS_ADD_SAVE',
        document: action.document,
      }));
    });

    it('should be finished', () => {
      assert.equal(generator.next().done, true);
    });
  });

  describe('documentsAddEdit() - edit', () => {
    const action = {
      document: {id: 1},
      callbackSuccess: () => {},
    };
    const generator = documentsAddEdit(action);

    it('should return the ApiDocuments.addEdit call', () => {
      assert.deepEqual(generator.next().value, call(ApiDocuments.addEdit));
    });

    it('should return the DOCUMENTS_EDIT_SAVE action', () => {
      assert.deepEqual(generator.next().value, put({
        type: 'DOCUMENTS_EDIT_SAVE',
        document: action.document,
      }));
    });

    it('should be finished', () => {
      assert.equal(generator.next().done, true);
    });
  });

  describe('documentsDelete()', () => {
    const action = {
      document_id: 1,
    };
    const generator = documentsDelete(action);

    it('should return the ApiDocuments.delete call', () => {
      assert.deepEqual(generator.next().value, call(ApiDocuments.delete));
    });

    it('should return the DOCUMENTS_DELETE_SAVE action', () => {
      assert.deepEqual(generator.next().value, put({
        type: 'DOCUMENTS_DELETE_SAVE',
        document_id: action.document_id,
      }));
    });

    it('should be finished', () => {
      assert.equal(generator.next().done, true);
    });
  });
});
