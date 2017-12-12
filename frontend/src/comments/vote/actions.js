import { rootURL } from '../../config'
import axios from 'axios'

export const UP_VOTE = 'UP_VOTE';
export const DOWN_VOTE = 'DOWN_VOTE';

function upVote(values){
  return {
    type: UP_VOTE,
    values
  }
}
function downVote(values){
  return {
    type: DOWN_VOTE,
    values
  }
}

export function asyncUpVote(selectedId){
  return (dispatch, getState) => {
    callVote(selectedId, 'upVote', (result) => {dispatch(upVote(result.data))})
  }
}
export function asyncDownVote(selectedId){
  return (dispatch, getState) => {
    callVote(selectedId, 'downVote', (result) => {dispatch(downVote(result.data))})
  }
}

function callVote(selectedId, option, callback){
  const url = `${rootURL}/comments/${selectedId}`
  axios.post(url, {id: selectedId, option: option})
      .then(result => {
        //console.log('Posts', Array.isArray(result))
        //console.log('result of after Vote Comment:', result)
        callback(result)
      })
}
