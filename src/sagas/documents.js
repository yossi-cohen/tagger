import ApiDocuments from "../api/documents";
import { call, put } from "redux-saga/effects";
import sort_by from "../util/arraySortby"

// -----------------------------------------------------------
// fetch the document's list
// -----------------------------------------------------------
export function* documentsFetchList(action) {
  // call the api to get the documents list
  try {
    const documents = yield call(ApiDocuments.getList);

    // save the documents in state
    yield put({
      type: 'DOCUMENTS_LIST_SAVE',
      documents: documents,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENTS_GET_LIST_FAILED',
      error: e,
    });
  }
}

// -----------------------------------------------------------
// add/edit a document
// -----------------------------------------------------------
export function* documentsAddEdit(action) {
  try {
    // call the api to add/edit the document
    yield call(ApiDocuments.addEdit, action.document);
    //return action.callbackError("Some error");   // show an error when the API fails

    // update the state by adding/editing the document
    yield put({
      type: action.document.id ? 'DOCUMENTS_EDIT_SAVE' : 'DOCUMENTS_ADD_SAVE',
      document: action.document,
    });

    // success
    action.callbackSuccess();
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENTS_ADD_EDIT_FAILED',
      documentId: action.document_id,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// delete a document
// -----------------------------------------------------------
export function* documentsDelete(action) {
  // call the api to delete the document
  try {
    yield call(ApiDocuments.delete, action.document_id);

    // update the state by removing the document
    yield put({
      type: 'DOCUMENTS_DELETE_SAVE',
      document_id: action.document_id,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENTS_DELETE_FAILED',
      documentId: action.document_id,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// get document tokens
// -----------------------------------------------------------
export function* documentGetTokens(action) {
  // call the api to get the document tokens
  try {
    let tokens = yield call(ApiDocuments.getTokens, action.document.id);
    tokens = tokens.sort(sort_by('index', false, parseInt));

    // save the tokens in the state
    yield put({
      type: 'DOCUMENT_TOKENS_SAVE',
      document: action.document,
      tokens: tokens,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_GET_TOKENS_FAILED',
      document: action.document,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// set token label
// -----------------------------------------------------------
export function* documentSetTokenLabel(action) {
  // call the api to set the token label
  try {
    yield call(ApiDocuments.setTokenLabel, action.token, action.label);

    // save the tokens in the state
    yield put({
      type: 'DOCUMENT_SET_TOKEN_LABEL_SAVE',
      token: action.token,
      label: action.label,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_SET_TOKEN_LABEL_FAILED',
      document: action.document,
      index: action.tokenIndex,
      label: action.label,
      error: e,
    });
  }
}
