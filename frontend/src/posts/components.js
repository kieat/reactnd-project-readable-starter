import React, { Component } from 'react';
import { connect } from 'react-redux'
import { asyncGetPosts } from './actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Posts extends Component {
  componentDidMount(){
    //console.log('componentDidMount-Posts.selectedCategory', this.props.selectedCategory)
    this.props.dispatch(asyncGetPosts(this.props.selectedCategory))
  }

  componentDidUpdate (prevProps) {
    //console.log('componentDidUpdate-Posts.selectedCategory', this.props.selectedCategory)
    // respond to parameter change in scenario 3
    let oldId = prevProps.selectedCategory
    let newId = this.props.selectedCategory
    if (newId !== oldId)
      this.props.dispatch(asyncGetPosts(newId))
  }

  render(){
    return(
      <ul className="posts">
        {this.props.posts.length === 0
          ? <li className="post">No posts in '{this.props.selectedCategory}'</li>
          : this.props.posts.map(post => (
              <li key={post.id} className="post">
                <div className="meta">
                  <span className="category">in '{post.category}'</span>
                </div>
                <Link to="/" className="link">{post.title}</Link>
                <div className="meta">
                  <span className="author">author: {post.author}</span>
                  <span className="commentcount">comments: {post.commentCount}</span>
                  <span className="voteScore">vote score: {post.voteScore}</span>
                </div>
                {/*
                <div className="body">
                  <p>{post.body}</p>
                </div>
                */}
              </li>
            ))
        }
      </ul>
    )
  }
}

//export default Categories

function mapStateToProps ( state, props ) {
  //console.log('mapStateToProps:', state.posts.selectedCategory)
  return {
    posts: state.posts.list,
    //selectedCategory: props.selectedCategory || state.posts.selectedCategory
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Posts))
