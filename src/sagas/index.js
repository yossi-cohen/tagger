import { takeLatest, fork } from "redux-saga/effects";
import *  as documentsSagas from "./documents";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'DOCUMENT_FETCH_LIST', documentsSagas.fetchDocListSaga),
    fork(takeLatest, 'DOCUMENT_ADD_EDIT', documentsSagas.addEditDocumentSaga),
    fork(takeLatest, 'DOCUMENT_DELETE', documentsSagas.deleteDocumentSaga),
    fork(takeLatest, 'DOCUMENT_GET_TEXT', documentsSagas.getTextSaga),
    fork(takeLatest, 'DOCUMENT_GET_TOKENS', documentsSagas.getTokensSaga),
    fork(takeLatest, 'DOCUMENT_SET_TOKEN_LABEL', documentsSagas.setTokenLabelSaga),
  ];
}
