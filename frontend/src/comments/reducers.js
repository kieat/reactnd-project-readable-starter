import { GET_COMMENTS, CREATE_COMMENT } from './actions'

const initialState = {
  list: [],
  selectedTarget: {}
}

export function comments(state = initialState, action){
  switch (action.type) {
    case GET_COMMENTS:
      /*return action.categories.reduce((categories, c) => {
        categories[c.name] = c.name
        categories[c.path] = c.path
        return categories
      }, {})
      */

      return {
        ...state,
        list: Array.isArray(action.comments) ? action.comments : [action.comments],
        selectedTarget: action.selectedTarget
      }
    case CREATE_COMMENT:
      return {
        ...state,
        list: state.list.concat([action.values]),
        selectedTarget: {}
      }
    default:
      return state;
  }
}
