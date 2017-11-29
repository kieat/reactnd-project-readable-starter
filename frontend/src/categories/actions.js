export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories({categories}){
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function asyncGetCategories(){
  return (dispatch, getState) => {
    const url = 'http://localhost:3001/categories';
    const headers = { headers: {'Authorization': 'udacity-project'} };

    if ( getState().categories.list.length === 0 ){
      fetch(url, headers)
        .then(result => {
          return result.json()
        })
        .then(result => {
          dispatch(getCategories({categories: result.categories}))
        })
    }else{
      //dispatch(getCategories({categories: getState().categories.list}))
    }
  }
}
