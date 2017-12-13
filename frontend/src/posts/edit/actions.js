import { rootURL, requestConfig } from '../../config'
import axios from 'axios'
import { reset } from 'redux-form'

export const DISABLE_INITIAL_LOADING = 'DISABLE_INITIAL_LOADING';
export const EDIT_POST = 'EDIT_POST';

export function disableInitialLoading(){
  return {
    type: DISABLE_INITIAL_LOADING
  }
}

function editPost(values){
  return {
    type: EDIT_POST,
    values
  }
}

export function asyncEditPost(values){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = `${rootURL}/posts/${values.id}`
    console.log('before fetching check values:', values)

    axios.put(url, values, requestConfig)
    .then(result => {
      //console.log('Posts', Array.isArray(result))
      console.log('AfterEditPost', result)
      dispatch(editPost(result.data))

      //dispatch(change('commentForm', 'author', ''))
      //dispatch(change('commentForm', 'author', ''))
      dispatch(reset('postEditForm'))

    })
    .catch((error) => {
      console.log(error)
    })
  }
}
