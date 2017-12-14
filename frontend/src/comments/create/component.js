import React from 'react';
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
//import serializeForm from 'form-serialize'
import uuid from 'uuid/v4'
import { renderField } from '../../config'

import { asyncCreateComment } from './actions'

const handleSubmitNewComment = (values, dispatch, props) => {
  //e.preventDefault()
  //const values = serializeForm(e.target, { hash: true, empty: true });
  //console.log("handlingSubmit", values)

  dispatch(asyncCreateComment(
    {
      ...values,
      id: uuid().replace(/-/g, ''),
      timestamp: Date.now(),
      parentId: props.parentId
    }
  ))

}

const validate = (values, props) => {
  let errors = {};
  //console.log('validating:', values)

  if (!values.author){
    errors.author = 'Required'
  }else{
    //errors.author = ''
  }

  if (!values.body){
    errors.body = 'Required'
  }else{
    //errors.author = ''
  }

  return errors
}

//class CreateComment extends Component {

//  render(){
    //console.log('rendering:', this.state)
function CreateComment(props){
    return (
      <div>
        <h4>New Comment</h4>
        <form onSubmit={props.handleSubmit(handleSubmitNewComment)} className="new-comment">
          <Field component={renderField} type="text" name="author" placeholder="Author"></Field>
          <Field component={renderField} type="textarea" name="body" placeholder="Write your comment"></Field>
          <button>Submit</button>
        </form>
      </div>
    )
//  }
}

function mapStateToProps(state){
  //console.log("mapStateToProps in create_comment:", state)
  return {
  }
}

export default withRouter(reduxForm(
  {
    form: 'commentForm',
    fields: ['author', 'body'],
    validate: validate,
    touchOnBlur: false,
    destroyOnUnmount: false
  }
)(connect(
  mapStateToProps
  //mapDispatchToProps
)(CreateComment)))
