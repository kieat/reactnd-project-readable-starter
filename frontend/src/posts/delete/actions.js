import { rootURL, requestConfig } from '../../config'
import axios from 'axios'

export const DELETE_POST = 'DELETE_POST';

function deletePost(values){
  return {
    type: DELETE_POST,
    values
  }
}

export function asyncDeletePost(selectedPostId, history){
  return (dispatch, getState) => {
    const url = `${rootURL}/posts/${selectedPostId}`
    axios.delete(url, requestConfig)
        .then(result => {
          console.log('result of after Delete Post:', result)
          dispatch(deletePost(result.data))
          if (result.data.category){
            history.push(`/${result.data.category}`)
          }else{
            history.push(`/`)
          }
        })
  }
}
