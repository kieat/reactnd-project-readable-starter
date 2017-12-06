import sortBy from 'sort-by';
export const GET_POSTS = 'GET_POSTS';

export function getPosts({posts, selectedTarget}){
  return {
    type: GET_POSTS,
    posts,
    selectedTarget
  }
}

const getURL = (selectedTarget) => {
  let url = ""

  if ( selectedTarget.type === 'category' ){
    url = selectedTarget.value
              ? `http://localhost:3001/${selectedTarget.value}/posts`
              : 'http://localhost:3001/posts';
  }else if ( selectedTarget.type === 'postId' ){
    url = `http://localhost:3001/posts/${selectedTarget.value}`
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

    if ( isNewTarget(selectedTarget, prevTarget) ){
      fetch(url, { headers: {'Authorization': 'udacity-project'} })
          .then(result => result.json())
          .then(result => {
            //console.log('Posts', Array.isArray(result))
            //console.log('Posts', result)
            dispatch(getPosts({posts: Array.isArray(result) ? result.sort(sortBy('-timestamp')) : [result], selectedTarget: selectedTarget}))
          })
    }
  }
}
