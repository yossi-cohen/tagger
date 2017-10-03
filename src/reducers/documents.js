// documents reducer
export default function documents(state = [], action) {
  switch (action.type) {
    case 'DOCUMENTS_LIST_SAVE':
      return action.documents;

    case 'DOCUMENTS_ADD_SAVE':
      const document = action.document;
      document.id = document.id || Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      return [...state, document];

    case 'DOCUMENTS_EDIT_SAVE':
      return state.map(document =>
        Number(document.id) === Number(action.document.id) ? { ...action.document } : document
      );

    case 'DOCUMENTS_DELETE_SAVE':
      return state.filter(document =>
        Number(document.id) !== Number(action.document_id)
      );

    case 'DOCUMENT_TOKENS_SAVE':
      const doc = { ...action.document };
      doc.tokens = [...action.tokens];
      return state.map(document =>
        Number(document.id) === Number(action.document.id) ? doc : document
      );

    case 'DOCUMENT_SET_TOKEN_LABEL_SAVE':
      return state.map(document => {
        if (Number(document.id) !== Number(action.token.documentId))
          return document;

        let doc = { ...document };

        doc.tokens = doc.tokens.map(token => {
          if (Number(token.id) !== Number(action.token.id))
            return token;
          let tok = { ...action.token };
          tok.label = action.label;
          return tok;
        });

        return doc;
      });

    // initial state
    default:
      return state;
  }
}
