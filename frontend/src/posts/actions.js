export const GET_POSTS = 'GET_POSTS';

export function getPosts({posts, selectedCategory}){
  return {
    type: GET_POSTS,
    posts,
    selectedCategory
  }
}

export function asyncGetPosts(category){
  return (dispatch, getState) => {
    let url = category
                ? 'http://localhost:3001/' + category + '/posts'
                : 'http://localhost:3001/posts';

    if ( getState().posts.selectedCategory !== null && getState().posts.selectedCategory === category ){
      //dispatch(getPosts({posts: getState().posts.list, selectedCategory: category}))
    }else{
      fetch(url, { headers: {'Authorization': 'udacity-project'} })
          .then(result => result.json())
          .then(result => {
            //console.log('Posts', result)
            dispatch(getPosts({posts: result, selectedCategory: category}))
          })
    }
  }
}
