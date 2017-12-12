import { GET_POSTS } from './actions'
import { CREATE_POST } from './create/actions'
import { DELETE_POST } from './delete/actions'
import { EDIT_POST, DISABLE_INITIAL_LOADING } from './edit/actions'
import { CREATE_COMMENT } from '../comments/create/actions'
import { DELETE_COMMENT } from '../comments/delete/actions'
import { UP_VOTE, DOWN_VOTE } from './vote/actions'

const initialState = {
  list: [],
  selectedTarget: {},
  reloadList: false,
  initialLoading: false
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
        selectedTarget: action.selectedTarget,
        reloadList: false,
        initialLoading: true
      }
      case CREATE_POST:
        return {
          ...state,
          list: state.list.concat([action.values]),
          reloadList: true,
          selectedTarget: {
            type: 'postId',
            value: action.values.id
          }
        }
      case DISABLE_INITIAL_LOADING:
        return {
          ...state,
          initialLoading: false
        }
      case EDIT_POST:
        return {
          ...state,
          list: state.list.map(p => {
            if ( p.id === action.values.id ){
              return action.values
            }else{
              return p
            }
          }),
          reloadList: true
        }
      case DELETE_POST:
        return {
          ...state,
          selectedTarget: {
            type: 'category',
            value: state.list.reduce((cId, p) => {
              if ( p.id === action.id )
                cId = p.category
              return cId
            }, null)
          },
          list: state.list.filter(c => c.id !== action.id)
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
      case CREATE_COMMENT:
        return {
          ...state,
          list: state.list.map(p => {
            p.commentCount += 1
            return p
          })
        }
      case DELETE_COMMENT:
        return {
          ...state,
          list: state.list.map(p => {
            p.commentCount -= 1
            return p
          })
        }
    default:
      return state;
  }
}
