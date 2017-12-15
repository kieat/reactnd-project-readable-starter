import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import SortAlphaAsc from 'react-icons/lib/fa/sort-alpha-asc'
import SortAlphaDesc from 'react-icons/lib/fa/sort-alpha-desc'

import { asyncGetPosts, sortByDate, sortByScore } from './actions'
import { asyncDeletePost } from './delete/actions'
import { asyncUpVote, asyncDownVote } from './vote/actions'
import Comments from '../comments/components'
import Error404 from '../Error404'

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

    switch (this.props.selectedTarget.type){
      case 'postId':
        if ( this.props.posts.length === 0 ){
          //postsDom = <li className="post">No post with ID '{this.props.selectedTarget.value}'</li>
          /***
          show 404 error page instead of post detail view above
          ***/
        }else if ( this.props.posts.length === 1 ){
          postsDom =
            this.props.posts.map(post => (
              <li key={post.id}>
              <div className="meta">
                <span className="category">in '{post.category}'</span>
              </div>
              <Link to={`/${post.category}/${post.id}`} className="link">{post.title}</Link>
              <div className="meta">
                <span className="author">author: {post.author}</span>
                <span className="commentcount">comments: {post.commentCount}</span>
                <span className="voteScore">vote score: {post.voteScore}</span>
              </div>

              <div className="body">
                <p>{post.body}</p>
              </div>

              <div className="buttons post">
                <a onClick={(e) => {e.preventDefault();this.props.dispatch(asyncUpVote(post.id))}}><ThumbsUp />+1</a>
                <a onClick={(e) => {e.preventDefault();this.props.dispatch(asyncDownVote(post.id))}}><ThumbsDown />-1</a>
              </div>

              <Comments selectedTarget={({type: 'postId', value: post.id})}/>

              </li>
            ))
        }
        break;
      case 'category':
        if ( this.props.posts.length === 0 ){
          postsDom = <li className="post">No post in '{this.props.selectedTarget.value}'</li>
        }else{
          postsDom =
            this.props.posts.map(post => (
              <li key={post.id} className="post">
                <div className="meta">
                  <span className="category">in '{post.category}'</span>
                  <div className="buttons in-posts">
                    <Link to={`/edit_post/${post.id}`}>Edit</Link>
                    <a onClick={(e) => this.props.dispatch(asyncDeletePost(post.id, this.props.history))}>Delete</a>
                    <a onClick={(e) => {e.preventDefault();this.props.dispatch(asyncUpVote(post.id))}}><ThumbsUp />+1</a>
                    <a onClick={(e) => {e.preventDefault();this.props.dispatch(asyncDownVote(post.id))}}><ThumbsDown />-1</a>
                  </div>
                </div>
                <Link to={`/${post.category}/${post.id}`} className="link">{post.title}</Link>
                <div className="meta">
                  <span className="author">author: {post.author}</span>
                  <span className="commentcount">comments: {post.commentCount}</span>
                  <span className="voteScore">vote score: {post.voteScore}</span>
                </div>
              </li>
            ))
        }
        break;
      default:
        return <li key="error"><span>error happened</span></li>
    }


    return(

      <div className="posts-container">
        <div className="buttons">
          <Link to="/new_post">New Post</Link>
          {
            ( this.props.posts.length === 1 && this.props.selectedTarget.type === 'postId' ) &&
              <Link to={`/edit_post/${this.props.selectedTarget.value}`}>Edit</Link>
          }
          {
            ( this.props.posts.length === 1 && this.props.selectedTarget.type === 'postId' ) &&
              <a onClick={(e) => this.props.dispatch(asyncDeletePost(this.props.selectedTarget.value, this.props.history))}>Delete</a>
          }
          {
            ( this.props.posts.length > 0 && this.props.selectedTarget.type === 'category' ) &&
              <a onClick={(e) => this.props.dispatch(sortByDate())}>{this.props.sortDirection.by === 'date' && ( this.props.sortDirection.asc ? <SortAlphaAsc /> : <SortAlphaDesc /> )}<span>Sort by Date</span></a>
          }
          {
            ( this.props.posts.length > 0 && this.props.selectedTarget.type === 'category' ) &&
              <a onClick={(e) => this.props.dispatch(sortByScore())}>{this.props.sortDirection.by === 'score' && ( this.props.sortDirection.asc ? <SortAlphaAsc /> : <SortAlphaDesc /> )}<span>Sort by Score</span></a>
          }

        </div>
        { this.props.posts.length === 0
          ? <Error404 />
          : <ul className="posts">
              { postsDom }
            </ul>
        }
      </div>
    )
  }
}

//export default Categories

function mapStateToProps ( state ) {
  //console.log('mapStateToProps:', state.posts.selectedCategory)
  return {
    posts: state.posts.list,
    sortDirection: state.posts.sortDirection
    //selectedTarget: state.posts.selectedTarget
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Posts))
