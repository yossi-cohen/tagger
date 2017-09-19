import { call, put } from "redux-saga/effects";
import ApiDocuments from "../api/documents";

// fetch the document's list
export function* documentsFetchList(action) {
  // call the api to get the documents list
  const documents = yield call(ApiDocuments.getList);

  // save the documents in state
  yield put({
    type: 'DOCUMENTS_LIST_SAVE',
    documents: documents,
  });
}

// add/edit a document
export function* documentsAddEdit(action) {
  // call the api to add/edit the document
  yield call(ApiDocuments.addEdit);
  //return action.callbackError("Some error");   // show an error when the API fails

  // update the state by adding/editing the document
  yield put({
    type: action.document.id ? 'DOCUMENTS_EDIT_SAVE' : 'DOCUMENTS_ADD_SAVE',
    document: action.document,
  });

  // success
  action.callbackSuccess();
}

// delete a document
export function* documentsDelete(action) {
  // call the api to delete the document
  yield call(ApiDocuments.delete);

  // update the state by removing the document
  yield put({
    type: 'DOCUMENTS_DELETE_SAVE',
    document_id: action.document_id,
  });
}

// get document tokens
export function* documentsGetTokens(action) {
  // call the api to get the document tokens
  yield call(ApiDocuments.getTokens, action.document_id);

  // update the state by adding the document tokens
  yield put({
    type: 'DOCUMENTS_GET_TOKENS',
    tokens: action.tokens,
  });

  // success
  action.callbackSuccess();
}

