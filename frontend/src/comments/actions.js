import { rootURL, requestConfig } from '../config'
import sortBy from 'sort-by';
import axios from 'axios'

export const GET_COMMENTS = 'GET_COMMENTS';

function getComments({comments, selectedTarget}){
  return {
    type: GET_COMMENTS,
    comments,
    selectedTarget
  }
}

const getURL = (selectedTarget) => {
  let url = ""
  //console.log('get URL: selectedTarget', selectedTarget)
  if ( selectedTarget.type === 'postId' ){
    url = `${rootURL}/posts/${selectedTarget.value}/comments`
  }else if ( selectedTarget.type === 'commentId' ){
    url = `${rootURL}/comments/${selectedTarget.value}`
  }

  return url
}

/*
const isNewTarget = (selectedTarget, prevTarget) => {
  let isNewTarget = false

  //console.log(prevTarget, selectedTarget)

  if ( prevTarget && 'value' in prevTarget ){
    if ( prevTarget.value === selectedTarget.value ){
      isNewTarget = false
    }else{
      isNewTarget = true
    }
  }else{
    isNewTarget = true
  }

  return isNewTarget;
}
*/

export function asyncGetComments(selectedTarget, prevTarget){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = getURL(selectedTarget)

    /*
    if ( typeof(prevTarget) === 'undefined' ){
      prevTarget = getState().comments.selectedTarget
    }

    if ( isNewTarget(selectedTarget, prevTarget) ){
    }
    */
      axios.get(url, requestConfig)
          .then(result => {
            //console.log('Posts', Array.isArray(result))
            //console.log('Posts', result)
            dispatch(getComments({comments: result.data.sort(sortBy('-timestamp')), selectedTarget: selectedTarget}))
          })
  }
}
