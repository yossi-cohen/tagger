// tags filter reducer
export default function paging(state = {}, action) {
  switch (action.type) {
    case 'DOCUMENT_LIST_COUNT_SAVE':
      return { ...state, total: action.total };

    // initial state
    default:
      return state;
  }
}
