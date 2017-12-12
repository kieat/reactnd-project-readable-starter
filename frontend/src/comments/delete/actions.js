import { rootURL } from '../../config'
import axios from 'axios'

export const DELETE_COMMENT = 'DELETE_COMMENT';

function deleteComment(id){
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function asyncDeleteComment(selectedCommentId){
  return (dispatch, getState) => {
    const url = `${rootURL}/comments/${selectedCommentId}`
    axios.delete(url)
        .then(result => {
          //console.log('Posts', Array.isArray(result))
          console.log('result of after Delete Comment:', result)
          dispatch(deleteComment(result.data.id))
        })
  }
}
