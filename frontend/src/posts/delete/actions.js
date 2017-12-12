import { rootURL } from '../../config'
import axios from 'axios'

export const DELETE_POST = 'DELETE_POST';

function deletePost(id){
  return {
    type: DELETE_POST,
    id
  }
}

export function asyncDeletePost(selectedPostId, history){
  return (dispatch, getState) => {
    const url = `${rootURL}/posts/${selectedPostId}`
    axios.delete(url)
        .then(result => {
          console.log('result of after Delete Post:', result)
          dispatch(deletePost(result.data.id))
          if (result.data.category){
            history.push(`/category/${result.data.category}`)
          }else{
            history.push(`/`)
          }
        })
  }
}
