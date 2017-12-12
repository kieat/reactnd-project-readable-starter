import { combineReducers } from 'redux'
import { categories } from './categories/reducers'
import { posts } from './posts/reducers'
import { comments } from './comments/reducers'
import { reducer as formReducer } from 'redux-form'

//export default categories
export default combineReducers({
  categories,
  posts,
  comments,
  form: formReducer
})
