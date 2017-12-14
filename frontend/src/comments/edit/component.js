import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { connect } from 'react-redux'
import { renderField } from '../../config'

import { asyncEditComment } from './actions'

const handleSubmitEditComment = (values, dispatch, props) => {
  dispatch(asyncEditComment(
    {
      ...values,
      id: props.commentToBeEditing.id,
      timestamp: Date.now()
    }
  ))
}

const validate = (values, props) => {
  let errors = {};
  //console.log('validating:', values)

  if (!values.body){
    errors.body = 'Required'
  }else{
    //errors.author = ''
  }

  return errors
}

class EditComment extends Component {
  componentDidMount = () => {
    this.props.dispatch(change('commentEditForm', 'body', this.props.commentToBeEditing.body))
  }

  render(){
    //console.log('rendering:', this.state)
    return (
      <form onSubmit={this.props.handleSubmit(handleSubmitEditComment)} className="edit-comment">
        <Field component={renderField} type="textarea" name="body" placeholder="Write your comment"></Field>
        <button>Submit</button>
      </form>
    )
  }
}

function mapStateToProps(state){
  //console.log("mapStateToProps in Edit_comment:", state)
  return {
  }
}

EditComment = connect(
  mapStateToProps
  //mapDispatchToProps
)(EditComment)

export default withRouter(reduxForm(
  {
    form: 'commentEditForm',
    fields: ['body'],
    validate: validate,
    touchOnBlur: false
  }
)(EditComment))
