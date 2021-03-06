import { GET_CATEGORIES } from './actions'

const initialState = {
  list: []
}

export function categories(state = initialState, action){
  switch (action.type) {
    case GET_CATEGORIES:
      /*return action.categories.reduce((categories, c) => {
        categories[c.name] = c.name
        categories[c.path] = c.path
        return categories
      }, {})
      */
      return {
        ...state,
        list: action.categories
      }
    default:
      return state;
  }
}
