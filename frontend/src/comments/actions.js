import sortBy from 'sort-by';
export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';

function getComments({comments, selectedTarget}){
  return {
    type: GET_COMMENTS,
    comments,
    selectedTarget
  }
}

function createComment(values){
  return {
    type: CREATE_COMMENT,
    values
  }
}

const rootURL = 'http://localhost:3001'

const getURL = (selectedTarget) => {
  let url = ""

  if ( selectedTarget.type === 'postId' ){
    url = `${rootURL}/posts/${selectedTarget.value}/comments`
  }else if ( selectedTarget.type === 'commentId' ){
    url = `${rootURL}/comments/${selectedTarget.value}`
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


export function asyncGetComments(selectedTarget, prevTarget){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = getURL(selectedTarget)

    if ( typeof(prevTarget) === 'undefined' ){
      prevTarget = getState().comments.selectedTarget
    }

    if ( isNewTarget(selectedTarget, prevTarget) ){
      fetch(url, { headers: {'Authorization': 'udacity-project'} })
          .then(result => result.json())
          .then(result => {
            //console.log('Posts', Array.isArray(result))
            //console.log('Posts', result)
            dispatch(getComments({comments: result.sort(sortBy('-timestamp')), selectedTarget: selectedTarget}))
          })
    }
  }
}

export function asyncCreateComment(values){
  return (dispatch, getState) => {
    //const oldId = getState().posts.selectedPost.id
    const url = `${rootURL}/comments`

    fetch(url, {
          headers: {'Authorization': 'udacity-project'},
          method: 'post',
          body: JSON.stringify(values)
        })
        .then(result => result.json())
        .then(result => {
          //console.log('Posts', Array.isArray(result))
          console.log('AfterCreateComment', result)
          dispatch(createComment(values))
        })
  }
}
