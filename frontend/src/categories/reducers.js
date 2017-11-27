import { GET_CATEGORIES } from './actions'

export function categories(state = [], action){
  switch (action.type) {
    case GET_CATEGORIES:
      /*return action.categories.reduce((categories, c) => {
        categories[c.name] = c.name
        categories[c.path] = c.path
        return categories
      }, {})
      */
      return action.categories;
    default:
      return state;
  }
}
