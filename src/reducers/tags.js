// tags filter reducer
export default function tags(state = [], action) {
  switch (action.type) {
    case 'SET_TAGS_FILTER':
      return [...action.tags];

    // initial state
    default:
      return state;
  }
}
