export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories(categories){
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function asyncGetCategories(){
  return (dispatch) => {
      fetch('http://localhost:3001/categories', { headers: {'Authorization': 'udacity-project'} })
        .then(result => {
          return result.json()
        })
        .then(result => {
          dispatch(getCategories(result.categories))
        })
  }
}
