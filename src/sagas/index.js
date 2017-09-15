import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { documentsFetchList, documentsAddEdit, documentsDelete } from "./documents";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'USERS_FETCH_LIST', documentsFetchList),
    fork(takeLatest, 'USERS_ADD_EDIT', documentsAddEdit),
    fork(takeLatest, 'USERS_DELETE', documentsDelete),
  ];
}
