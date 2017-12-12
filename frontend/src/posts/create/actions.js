import { rootURL } from '../../config'
import axios from 'axios'
import { reset } from 'redux-form'

export const CREATE_POST = 'CREATE_POST';

function createPost(values){
  return {
    type: CREATE_POST,
    values
  }
}

export function asyncCreatePost(values){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = `${rootURL}/posts`
    console.log('before creating new post:', values)

    axios.post(url, values)
    .then(result => {
      //console.log('AfterCreatePost', result, getState())
      dispatch(createPost(result.data))

      dispatch(reset('postForm'))
      //dispatch(gotoPost(result.data.id))
    })
  }
}
