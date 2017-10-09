// documents reducer
export default function documents(state = [], action) {
  switch (action.type) {
    case 'DOCUMENT_LIST_SAVE':
      return action.documents;

    case 'DOCUMENT_ADD_SAVE':
      return [...state, action.document];

    case 'DOCUMENT_EDIT_SAVE':
      return state.map(document =>
        document.id === action.document.id ? { ...action.document } : document
      );

    case 'DOCUMENT_DELETE_SAVE':
      return state.filter(document =>
        document.id !== action.documentId
      );

    case 'DOCUMENT_TEXT_SAVE': {
      return state.map(document => {
        if (document.id !== action.documentId)
          return document;
        let doc = { ...document };
        doc.text = String(action.text);
        return doc;
      });
    }

    case 'DOCUMENT_TOKENS_SAVE': {
      return state.map(document => {
        if (document.id !== action.documentId)
          return document;
        let doc = { ...document };
        doc.tokens = [...action.tokens];
        return doc;
      });
    }

    case 'DOCUMENT_SET_TOKEN_LABEL_SAVE':
      return state.map(document => {
        if (document.id !== action.token.documentId)
          return document;

        let doc = { ...document };

        doc.tokens = doc.tokens.map(token => {
          if (token.id !== action.token.id)
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
