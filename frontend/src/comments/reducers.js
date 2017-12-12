import { GET_COMMENTS } from './actions'
import { CREATE_COMMENT } from './create/actions'
import { DELETE_COMMENT } from './delete/actions'
import { UP_VOTE, DOWN_VOTE } from './vote/actions'
import { EDIT_COMMENT, PREPARE_EDITING, CANCEL_EDITING } from './edit/actions'

const initialState = {
  list: [],
  selectedTarget: {},
  toBeEditing: {}
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
        list: state.list.concat([action.values])
      }
    case DELETE_COMMENT:
      return {
        ...state,
        list: state.list.filter(c => c.id !== action.id),
        toBeEditing: {}
      }
    case CANCEL_EDITING:
      return {
        ...state,
        toBeEditing: {}
      }
    case PREPARE_EDITING:
      return {
        ...state,
        toBeEditing: action.values
      }
    case EDIT_COMMENT:
      return {
        ...state,
        list: state.list.map(c => {
          if ( c.id === action.values.id ){
            return action.values
          }else{
            return c
          }
        })
      }
    case UP_VOTE:
      return {
        ...state,
        list: state.list.map(item => {
          if ( item.id === action.values.id ){
            //item.voteScore += 1
            return action.values;
          }else{
            return item;
          }
        })
      }
    case DOWN_VOTE:
      return {
        ...state,
        list: state.list.map(item => {
          if ( item.id === action.values.id ){
            //item.voteScore -= 1
            return action.values;
          }else{
            return item;
          }
        })
      }
    default:
      return state;
  }
}
