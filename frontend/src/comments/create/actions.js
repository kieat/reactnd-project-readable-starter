import { rootURL, requestConfig } from '../../config'
import axios from 'axios'
import { reset } from 'redux-form'

export const CREATE_COMMENT = 'CREATE_COMMENT';

function createComment(values){
  return {
    type: CREATE_COMMENT,
    values
  }
}

export function asyncCreateComment(values){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = `${rootURL}/comments`
    //console.log('before fetching check values:', values)

    axios.post(url, values, requestConfig)
    .then(result => {
      //console.log('Posts', Array.isArray(result))
      console.log('AfterCreateComment', result, getState())
      dispatch(createComment(result.data))

      //dispatch(change('commentForm', 'author', ''))
      //dispatch(change('commentForm', 'author', ''))
      dispatch(reset('commentForm'))
    })
  }
}
