// documents reducer
export default function documents(state = {}, action) {
  switch (action.type) {
    case 'DOCUMENTS_LIST_SAVE':
      return action.documents;

    case 'DOCUMENTS_ADD_SAVE':
      const document = action.document;
      document.id = document.id || Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      return [...state, document];

    case 'DOCUMENTS_EDIT_SAVE':
      return state.map(document =>
        Number(document.id) === Number(action.document.id) ? {...action.document} : document
      );
      break;

    case 'DOCUMENTS_DELETE_SAVE':
      return state.filter(document =>
        Number(document.id) !== Number(action.document_id)
      );

    case 'DOCUMENTS_GET_TOKENS':
      const tokens = action.tokens;
      return [...state, tokens];

    // initial state
    default:
      return state;
  }
}