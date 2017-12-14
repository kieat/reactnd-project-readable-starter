import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dateFormat from 'dateformat'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

import { asyncGetComments } from './actions'
import { asyncDeleteComment } from './delete/actions'
import { asyncUpVote, asyncDownVote } from './vote/actions'
import { prepareEditing, cancelEditing } from './edit/actions'
import CreateComment from './create/component'
import EditComment from './edit/component'

class Comments extends Component {

  componentDidMount(){
    //console.log('componentDidMount-Comments.selectedTarget', this.props.selectedTarget)
    this.props.dispatch(asyncGetComments(this.props.selectedTarget))
  }

  componentDidUpdate(prevProps) {
    //console.log('componentDidUpdate-Comments.selectedTarget', this.props.selectedTarget, prevProps.selectedTarget)
    //this.props.dispatch(asyncGetComments(this.props.selectedTarget, prevProps.selectedTarget))
  }

  handleDelete = (e, selectedCommentId) => {
    e.preventDefault();
    this.props.dispatch(asyncDeleteComment(selectedCommentId))
  }

  handleEdit = (e, selectedCommentId) => {
    e.preventDefault();
    //this.props.dispatch(asyncEditComment(selectedCommentId))
    const commentToBeEditing = this.props.comments.reduce((commentToBeEditing, c) => {
      if ( c.id === selectedCommentId )
        commentToBeEditing = c
      return commentToBeEditing
    }, {})

    this.props.dispatch(prepareEditing(commentToBeEditing))
  }

  handleCancelEditing = (e) => {
    e.preventDefault();

    this.props.dispatch(cancelEditing())
  }

  render(){

    let commentsDom = ''

    if ( this.props.selectedTarget.type === "commentId" ){
      if ( this.props.comments.length === 0 ){
        commentsDom = <li className="comment">No comment with ID '{this.props.selectedTarget.value}'</li>
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

    if ( this.props.selectedTarget.type === "postId" ){
      if ( this.props.comments.length === 0 ){
        commentsDom = <li className="comment">No comment for this post</li>
      }else{
        commentsDom =
          this.props.comments.map(comment => (
            <li key={comment.id} className="comment">
              <div className="meta meta-top">
                <span className="author">{comment.author}</span>
                <span className="id hidden">{comment.id}</span>

                <div className="buttons comment">
                  <a onClick={(e) => this.handleDelete(e, comment.id)}>delete</a>

                  { Object.keys(this.props.commentToBeEditing).length > 0 && this.props.commentToBeEditing.id === comment.id
                    ? <a onClick={(e) => this.handleCancelEditing(e)}>cancel</a>
                    : <a onClick={(e) => this.handleEdit(e, comment.id)}>edit</a>
                  }

                  <a onClick={(e) => {e.preventDefault();this.props.dispatch(asyncUpVote(comment.id))}}><ThumbsUp />+1</a>
                  <a onClick={(e) => {e.preventDefault();this.props.dispatch(asyncDownVote(comment.id))}}><ThumbsDown />-1</a>
                </div>
              </div>

              { Object.keys(this.props.commentToBeEditing).length > 0 && this.props.commentToBeEditing.id === comment.id
                ? <EditComment commentToBeEditing={this.props.commentToBeEditing}/>
                : <p className="body">{comment.body}</p>
              }

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
          <li key="new">
            <CreateComment parentId={this.props.selectedTarget.value}/>
          </li>
        </ul>
      </div>
    )
  }
}

//export default Categories

function mapStateToProps ( state ) {
  //console.log('mapStateToProps in comments:', state)
  return {
    comments: state.comments.list,
    commentToBeEditing: state.comments.toBeEditing
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Comments))
