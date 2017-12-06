import React, { Component } from 'react';
import { connect } from 'react-redux'
import { asyncGetComments, asyncCreateComment } from './actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import dateFormat from 'dateformat'
import serializeForm from 'form-serialize'
import uuid from 'uuid/v4'

class Comments extends Component {
  componentDidMount(){
    //console.log('componentDidMount-Comments.selectedTarget', this.props.selectedTarget)
    this.props.dispatch(asyncGetComments(this.props.selectedTarget))
  }

  componentDidUpdate(prevProps) {
    //console.log('componentDidUpdate-Posts.selectedCategory', this.props.selectedTarget, prevProps.selectedTarget)
    this.props.dispatch(asyncGetComments(this.props.selectedTarget, prevProps.selectedTarget))
  }

  handleSubmitNewComment(e, dispatch){
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true, empty: true });
    console.log("form values", this.props)
    dispatch(asyncCreateComment(
      {
        ...values,
        id: uuid(),
        timestamp: Date.now()
      }
    ))
  }

  render(){
    let commentsDom = ''

    if ( this.props.selectedTarget.type === "commentId" ){
      if ( this.props.comments.length === 0 ){
        commentsDom = <li className="comment">No comment with ID '{this.props.selectedTarget.value}'</li>
      }else{
        commentsDom =
          this.props.comments.map(comment => (
            <li key={comment.id}>
            <div className="meta">
              <span className="category">in '{comment.category}'</span>
            </div>
            <Link to={`/post/${comment.id}`} className="link">{comment.title}</Link>
            <div className="meta">
              <span className="author">author: {comment.author}</span>
              <span className="commentcount">comments: {comment.commentCount}</span>
              <span className="voteScore">vote score: {comment.voteScore}</span>
            </div>

            <div className="body">
              <p>{comment.body}</p>
            </div>
            </li>
          ))
      }
    }

    if ( this.props.selectedTarget.type === "postId" ){
      if ( this.props.comments.length === 0 ){
        commentsDom = <li className="comment">No comment for this post</li>
      }else{
        commentsDom =
          this.props.comments.map(comment => (
            <li key={comment.id} className="comment">
              <div className="meta meta-top">
                <span className="author">{comment.author}</span>
                <span className="id">{comment.id}</span>
              </div>
              <p className="body">{comment.body}</p>
              <div className="meta meta-bottom">
                <span className="voteScore">vote score: {comment.voteScore}</span>
                <span className="timestamp">{dateFormat(new Date(comment.timestamp),'fullDate')}</span>
              </div>
            </li>
          ))
      }
    }

    return(
      <div className="comments-container">
        <h4 className="comments-header">Comments</h4>
        <ul className="comments">
          { commentsDom }
          <li key="new" className="new-comment">
            <form onSubmit={(e) => this.handleSubmitNewComment(e, this.props.dispatch)}>
              <input type="text" name="author" placeholder="Author"></input>
              <textarea name="body" placeholder="Write your comment"></textarea>
              <input type="hidden" name="parentId" value={this.props.selectedTarget.value}></input>
              <button>Submit</button>
            </form>
          </li>
        </ul>
    </div>
    )
  }
}

//export default Categories

function mapStateToProps ( state, props ) {
  //console.log('mapStateToProps:', state.posts.selectedCategory)
  return {
    comments: state.comments.list
    //selectedTarget: state.posts.selectedTarget
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Comments))
