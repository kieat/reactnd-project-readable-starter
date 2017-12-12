import { rootURL } from '../../config'
import axios from 'axios'
import { reset } from 'redux-form'

export const PREPARE_EDITING = 'PREPARE_EDITING';
export const CANCEL_EDITING = 'CANCEL_EDITING';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export function cancelEditing(){
  return {
    type: CANCEL_EDITING
  }
}

export function prepareEditing(values){
  return {
    type: PREPARE_EDITING,
    values
  }
}

function editComment(values){
  return {
    type: EDIT_COMMENT,
    values
  }
}

export function asyncEditComment(values){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = `${rootURL}/comments/${values.id}`
    //console.log('before fetching check values:', values)

    axios.put(url, values)
    .then(result => {
      //console.log('Posts', Array.isArray(result))
      //console.log('AfterEditComment', result, getState())
      dispatch(editComment(result.data))

      //dispatch(change('commentForm', 'author', ''))
      //dispatch(change('commentForm', 'author', ''))
      dispatch(reset('commentEditForm'))
      dispatch(cancelEditing())
    })
  }
}
