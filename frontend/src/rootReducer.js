import { combineReducers } from 'redux'
import { categories } from './categories/reducers'
import { posts } from './posts/reducers'

//export default categories
export default combineReducers({
  categories,
  posts
})
