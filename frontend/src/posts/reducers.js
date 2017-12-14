import sortBy from 'sort-by';

import { GET_POSTS, SORT_BY_DATE, SORT_BY_SCORE } from './actions'
import { CREATE_POST } from './create/actions'
import { DELETE_POST } from './delete/actions'
import { EDIT_POST, DISABLE_INITIAL_LOADING } from './edit/actions'
import { CREATE_COMMENT } from '../comments/create/actions'
import { DELETE_COMMENT } from '../comments/delete/actions'
import { UP_VOTE, DOWN_VOTE } from './vote/actions'

const initialState = {
  list: [],
  selectedTarget: {},
  selectedCategory: "",
  reloadList: false,
  initialLoading: false,
  sortDirection: {
    by: 'date',
    asc: true
  }
}

let newDirection = {}

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
        selectedCategory: action.selectedTarget.type === 'category'
                            ? action.selectedTarget.value
                            : action.posts.length === 1
                              ? action.posts[0].category
                              : "",
        reloadList: false,
        initialLoading: true
      }
      case SORT_BY_DATE:
        newDirection = {
          by: 'date',
          asc: action.direction === undefined ? !state.sortDirection.asc : action.direction
        }
        if ( newDirection.by !== state.sortDirection.by )
          newDirection.asc = action.direction === undefined ? true : action.direction

        return {
          ...state,
          sortDirection: {
            ...state.sortDirection,
            by: newDirection.by,
            asc: newDirection.asc
          },
          list: state.list.sort(sortBy(newDirection.asc ? 'timestamp' : '-timestamp'))
        }
      case SORT_BY_SCORE:
        newDirection = {
          by: 'score',
          asc: action.direction === undefined ? !state.sortDirection.asc : action.direction
        }
        if ( newDirection.by !== state.sortDirection.by )
          newDirection.asc = action.direction === undefined ? true : action.direction

        return {
          ...state,
          sortDirection: {
            ...state.sortDirection,
            by: newDirection.by,
            asc: newDirection.asc
          },
          list: state.list.sort(sortBy(newDirection.asc ? 'voteScore' : '-voteScore'))
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
          selectedTarget: {},
          /*
          selectedTarget: {
            type: 'category',
            value: action.values.category
          },
          */
          list: state.list.filter(c => c.id !== action.values.id)
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
