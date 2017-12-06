import React, { Component } from 'react';
import { connect } from 'react-redux'
import { asyncGetPosts } from './actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Comments from '../comments/components'

class Posts extends Component {
  componentDidMount(){
    //console.log('componentDidMount-Posts.selectedTarget', this.props.selectedTarget)
    this.props.dispatch(asyncGetPosts(this.props.selectedTarget))
  }

  componentDidUpdate (prevProps) {
    //console.log('componentDidUpdate-Posts.selectedCategory', this.props.selectedTarget, prevProps.selectedTarget)
    this.props.dispatch(asyncGetPosts(this.props.selectedTarget, prevProps.selectedTarget))
  }

  render(){
    let postsDom = ''

    if ( this.props.selectedTarget.type === "postId" ){
      if ( this.props.posts.length === 0 ){
        postsDom = <li className="post">No post with ID '{this.props.selectedTarget.value}'</li>
      }else{
        postsDom =
          this.props.posts.map(post => (
            <li key={post.id}>
            <div className="meta">
              <span className="category">in '{post.category}'</span>
            </div>
            <Link to={`/post/${post.id}`} className="link">{post.title}</Link>
            <div className="meta">
              <span className="author">author: {post.author}</span>
              <span className="commentcount">comments: {post.commentCount}</span>
              <span className="voteScore">vote score: {post.voteScore}</span>
            </div>

            <div className="body">
              <p>{post.body}</p>
            </div>

            <Comments selectedTarget={({type: 'postId', value: post.id})}/>

            </li>
          ))
      }
    }

    if ( this.props.selectedTarget.type === "category" ){
      if ( this.props.posts.length === 0 ){
        postsDom = <li className="post">No post in '{this.props.selectedTarget.value}'</li>
      }else{
        postsDom =
          this.props.posts.map(post => (
            <li key={post.id} className="post">
              <div className="meta">
                <span className="category">in '{post.category}'</span>
              </div>
              <Link to={`/post/${post.id}`} className="link">{post.title}</Link>
              <div className="meta">
                <span className="author">author: {post.author}</span>
                <span className="commentcount">comments: {post.commentCount}</span>
                <span className="voteScore">vote score: {post.voteScore}</span>
              </div>
            </li>
          ))
      }
    }

    return(
      <ul className="posts">
        { postsDom }
      </ul>
    )
  }
}

//export default Categories

function mapStateToProps ( state, props ) {
  //console.log('mapStateToProps:', state.posts.selectedCategory)
  return {
    posts: state.posts.list
    //selectedTarget: state.posts.selectedTarget
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Posts))
