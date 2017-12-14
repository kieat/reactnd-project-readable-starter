import { rootURL, requestConfig } from '../config'
import axios from 'axios'

export const GET_POSTS = 'GET_POSTS';
export const SORT_BY_DATE = 'SORT_BY_DATE';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';

export function getPosts({posts, selectedTarget}){
  return {
    type: GET_POSTS,
    posts,
    selectedTarget
  }
}

export function sortByDate(direction){
  return {
    type: SORT_BY_DATE,
    direction
  }
}

export function sortByScore(direction){
  return {
    type: SORT_BY_SCORE,
    direction
  }
}

const getURL = (selectedTarget) => {
  let url = ""

  if ( selectedTarget.type === 'category' ){
    url = selectedTarget.value
              ? `${rootURL}/${selectedTarget.value}/posts`
              : `${rootURL}/posts`;
  }else if ( selectedTarget.type === 'postId' ){
    url = `${rootURL}/posts/${selectedTarget.value}`
  }

  return url
}

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


export function asyncGetPosts(selectedTarget, prevTarget){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = getURL(selectedTarget)

    if ( typeof(prevTarget) === 'undefined' ){
      prevTarget = getState().posts.selectedTarget
    }

    if ( isNewTarget(selectedTarget, prevTarget) || getState().posts.reloadList === true ){
      axios.get(url, requestConfig)
          .then(result => {
            //console.log('Posts', Array.isArray(result))
            console.log('Posts', result)
            dispatch(getPosts({
              posts: Array.isArray(result.data)
                  ? result.data
                  : result.data && Object.keys(result.data).length > 0 ? [result.data] : [],
              selectedTarget: selectedTarget
            }))
            dispatch(sortByDate(true))
          })
          .catch(error => {

          })
    }
  }
}
