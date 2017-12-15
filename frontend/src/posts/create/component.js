import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { connect } from 'react-redux'
//import serializeForm from 'form-serialize'
import uuid from 'uuid/v4'
import { renderField } from '../../config'

import { asyncCreatePost } from './actions'

const handleSubmitNewPost = (values, dispatch, props) => {

  dispatch(asyncCreatePost(
    {
      ...values,
      id: uuid().replace(/-/g, ''),
      timestamp: Date.now()
    }
  ))

}

const validate = (values, props) => {
  let errors = {};
  console.log('validating:', values, props)

  props.fields.map(key => {

    if (!values[key]){
      errors[key] = 'Required'
    }else{
      //errors.author = ''
    }

    return key;
  })

  return errors
}


class CreatePost extends Component {

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack()
  }

  componentDidMount = () => {
    if ( this.props.categories.length > 0 )
      this.props.dispatch(change('postForm', 'category', this.props.selectedCategory || this.props.categories[0].path))
  }

  render(){
    //console.log('rendering:', this.state)
    return (
      Object.keys(this.props.selectedTarget).length > 0 && this.props.selectedTarget.type === 'postId' && this.props.reloadList === true
      ? <Redirect to={`/post/${this.props.selectedTarget.value}`} />
      :
      <div className="posts-container">
        <h4>New Post</h4>
        <form onSubmit={this.props.handleSubmit(handleSubmitNewPost)} className="new-post">
          {/*
          <Field component="select" name="category" placeholder="Category">
            <optgroup label="Category">
            {this.props.categories.map(c => (<option key={c.path} value={c.path}>{c.name}</option>))}
            </optgroup>
          </Field>
          */}
          <Field component={renderField} type="select" name="category" placeholder="Category" optionList={this.props.categories.map(c => ({value:c.path,label:c.name}))}></Field>
          <Field component={renderField} type="text" name="title" placeholder="Title"></Field>
          <Field component={renderField} type="text" name="author" placeholder="Author"></Field>
          <Field component={renderField} type="textarea" name="body" placeholder="Write your post"></Field>
          <button>Submit</button>
          <button onClick={(e) => this.handleCancel(e)}>Cancel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  //console.log("mapStateToProps in create_comment:", state)
  return {
    categories: state.categories.list,
    selectedTarget: state.posts.selectedTarget,
    reloadList: state.posts.reloadList,
    selectedCategory: state.posts.selectedCategory
  }
}


export default withRouter(reduxForm(
    {
      form: 'postForm',
      fields: ['author', 'body', 'title', 'category'],
      validate: validate,
      touchOnBlur: false,
      destroyOnUnmount: false
    }
  )(connect(
      mapStateToProps
      //mapDispatchToProps
    )(CreatePost)
  )
)
