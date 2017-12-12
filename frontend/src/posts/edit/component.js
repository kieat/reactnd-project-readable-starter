import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { connect } from 'react-redux'
//import serializeForm from 'form-serialize'
//import uuid from 'uuid/v4'
import { renderField } from '../../config'

import { asyncEditPost, disableInitialLoading } from './actions'
import { asyncGetPosts } from '../actions'

const handleSubmitEditPost = (values, dispatch, props) => {

  console.log('handling edit post:', props.selectedTarget.value)
  dispatch(asyncEditPost(
    {
      ...values,
      id: props.selectedTarget.value
    }
  ))

}

const validate = (values, props) => {
  let errors = {};
  console.log('validating:', values)

  Object.keys(values).map(key => {

    if (!values[key]){
      errors[key] = 'Required'
    }else{
      //errors.author = ''
    }

    return errors;
  })

  console.log(errors, 'has error')
  return errors
}


class EditPost extends Component {

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack()
  }

  componentDidMount = () => {
    if (Object.keys(this.props.toBeEdited).length === 0)
      this.props.dispatch(asyncGetPosts(this.props.selectedTarget))
  }

  componentDidUpdate (prevProps) {
    //console.log(this.props.toBeEdited)
    if (this.props.initialLoading === true){
      this.props.dispatch(change('postEditForm', 'title', this.props.toBeEdited.title))
      this.props.dispatch(change('postEditForm', 'body', this.props.toBeEdited.body))
      this.props.dispatch(disableInitialLoading())
    }
  }

  render(){
    //console.log('rendering:', this.props.toBeEdited)
    return (
      Object.keys(this.props.selectedTarget).length > 0 && this.props.selectedTarget.type === 'postId' && this.props.reloadList === true
      ? <Redirect to={`/post/${this.props.selectedTarget.value}`} />
      :
      <div className="posts-container">
        <h4>Edit Post</h4>
        <form onSubmit={this.props.handleSubmit(handleSubmitEditPost)} className="edit-post">
          <Field component={renderField} type="text" name="title" placeholder="Title"></Field>
          <Field component={renderField} type="textarea" name="body" placeholder="Write your post"></Field>
          <button>Submit</button>
          <button onClick={(e) => this.handleCancel(e)}>Cancel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log("mapStateToProps in edit post:", state)
  return {
    reloadList: state.posts.reloadList,
    initialLoading: state.posts.initialLoading,
    toBeEdited: state.posts.list.reduce((post, p) => {
      if ( p.id === state.posts.selectedTarget.value )
        post = p
      return {
        ...post
      }
    }, {})
  }
}


export default withRouter(reduxForm(
    {
      form: 'postEditForm',
      fields: ['body', 'title'],
      validate: validate,
      touchOnBlur: false,
      destroyOnUnmount: false
    }
  )(connect(
      mapStateToProps
      //mapDispatchToProps
    )(EditPost)
  )
)
