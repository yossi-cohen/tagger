import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import {
  documentsFetchList,
  documentsAddEdit,
  documentsDelete,
  documentGetTokens,
  documentSetTokenLabel
} from "./documents";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'DOCUMENTS_FETCH_LIST', documentsFetchList),
    fork(takeLatest, 'DOCUMENTS_ADD_EDIT', documentsAddEdit),
    fork(takeLatest, 'DOCUMENTS_DELETE', documentsDelete),
    fork(takeLatest, 'DOCUMENT_GET_TOKENS', documentGetTokens),
    fork(takeLatest, 'DOCUMENT_SET_TOKEN_LABEL', documentSetTokenLabel),
  ];
}
