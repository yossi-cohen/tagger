import ApiDocuments from "../api/documents";
import { call, put } from "redux-saga/effects";

// -----------------------------------------------------------
// fetch the document's list
// -----------------------------------------------------------
export function* fetchDocListSaga(action) {
  // call the api to get the documents list
  try {
    const documents = yield call(ApiDocuments.getList,
      action.page,
      action.pageSize,
      action.sortBy,
      action.order,
      action.tags);

    yield [
      // save the documents total count in the state
      yield put({
        type: 'DOCUMENT_LIST_COUNT_SAVE',
        total: documents.total
      }),

      // save the documents in the state
      yield put({
        type: 'DOCUMENT_LIST_SAVE',
        documents: documents.documents,
      })
    ];
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_GET_LIST_FAILED',
      error: e,
    });
  }
}

// -----------------------------------------------------------
// add/edit a document
// -----------------------------------------------------------
export function* addEditDocumentSaga(action) {
  try {
    // call the api to add/edit the document
    const document = yield call(ApiDocuments.addEdit, action.document);
    //return action.callbackError("Some error");   // show an error when the API fails

    // update the state by adding/editing the document
    yield put({
      type: action.document.id ? 'DOCUMENT_EDIT_SAVE' : 'DOCUMENT_ADD_SAVE',
      document: document,
    });

    // success
    action.callbackSuccess();
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_ADD_EDIT_FAILED',
      documentId: action.documentId,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// delete a document
// -----------------------------------------------------------
export function* deleteDocumentSaga(action) {
  // call the api to delete the document
  try {
    yield call(ApiDocuments.delete, action.documentId);

    // update the state by removing the document
    yield put({
      type: 'DOCUMENT_DELETE_SAVE',
      documentId: action.documentId,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_DELETE_FAILED',
      documentId: action.documentId,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// get document text
// -----------------------------------------------------------
export function* getTextSaga(action) {
  // call the api to get the document text
  try {
    let text = yield call(ApiDocuments.getText, action.documentId);

    // save the tokens in the state
    yield put({
      type: 'DOCUMENT_TEXT_SAVE',
      documentId: action.documentId,
      text: text,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_GET_TEXT_FAILED',
      documentId: action.documentId,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// get document tokens
// -----------------------------------------------------------
export function* getTokensSaga(action) {
  // call the api to get the document tokens
  try {
    let tokens = yield call(ApiDocuments.getTokens, action.documentId);

    // save the tokens in the state
    yield put({
      type: 'DOCUMENT_TOKENS_SAVE',
      documentId: action.documentId,
      tokens: tokens,
    });
  } catch (e) {
    // error
    yield put({
      type: 'DOCUMENT_GET_TOKENS_FAILED',
      documentId: action.documentId,
      error: e,
    });
  }
}

// -----------------------------------------------------------
// set token label
// -----------------------------------------------------------
export function* setTokenLabelSaga(action) {
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
