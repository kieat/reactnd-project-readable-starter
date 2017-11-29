import { GET_POSTS } from './actions'

const initialState = {
  selectedCategory: null,
  list: []
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
        selectedCategory: action.selectedCategory,
        list: action.posts
      }
    default:
      return state;
  }
}
