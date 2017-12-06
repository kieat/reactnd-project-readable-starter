import { GET_POSTS } from './actions'

const initialState = {
  list: [],
  selectedTarget: {}
}

export function posts(state = initialState, action){
  switch (action.type) {
    case GET_POSTS:
      /*return action.categories.reduce((categories, c) => {
        categories[c.name] = c.name
        categories[c.path] = c.path
        return categories
      }, {})
      */

      return {
        ...state,
        list: action.posts,
        selectedTarget: action.selectedTarget
      }
    default:
      return state;
  }
}
