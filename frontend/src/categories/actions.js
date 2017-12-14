import axios from 'axios'
import { rootURL, requestConfig } from '../config'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories({categories}){
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function asyncGetCategories(selectedTarget){
  return (dispatch, getState) => {
    const url = `${rootURL}/categories`;
    //const headers = { headers: {'Authorization': 'udacity-project'} };

    if ( getState().categories.list.length === 0 || Boolean( selectedTarget && selectedTarget.type === 'category' )){
      axios.get(url, requestConfig)
        .then(result => {
          console.log('result of get categories:', result)

          if ( result.data.categories.filter(c => (
            selectedTarget && selectedTarget.type === 'category' && selectedTarget.value
            ? selectedTarget.value === c.path
            : true
          )).length === 0 ){
            dispatch(getCategories({
              categories: []
            }))
          }else{
            dispatch(getCategories({
              categories: result.data.categories
            }))
          }

        })
        .catch(error => {
          console.log(error)
          dispatch(getCategories({categories: []}))
        })
    }else{
      //dispatch(getCategories({categories: getState().categories.list}))
    }
  }
}
