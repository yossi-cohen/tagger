import { call, put } from "redux-saga/effects";
import ApiDocuments from "../api/documents";

// fetch the document's list
export function* documentsFetchList(action) {
  // call the api to get the documents list
  const documents = yield call(ApiDocuments.getList);

  // save the documents in state
  yield put({
    type: 'USERS_LIST_SAVE',
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
    type: action.document.id ? 'USERS_EDIT_SAVE' : 'USERS_ADD_SAVE',
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
    type: 'USERS_DELETE_SAVE',
    document_id: action.document_id,
  });
}
