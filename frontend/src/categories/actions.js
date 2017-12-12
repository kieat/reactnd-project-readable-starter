import axios from 'axios'
import { rootURL } from '../config'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories({categories}){
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function asyncGetCategories(){
  return (dispatch, getState) => {
    const url = `${rootURL}/categories`;
    //const headers = { headers: {'Authorization': 'udacity-project'} };

    if ( getState().categories.list.length === 0 ){
      axios.get(url)
        .then(result => {
          //console.log('result of get categories:', result)
          dispatch(getCategories({categories: result.data.categories}))
        })
    }else{
      //dispatch(getCategories({categories: getState().categories.list}))
    }
  }
}
