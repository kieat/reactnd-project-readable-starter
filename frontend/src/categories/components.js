import React, { Component } from 'react';
import { connect } from 'react-redux'
import { asyncGetCategories } from './actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Categories extends Component {
  componentDidMount(){
    this.props.dispatch(asyncGetCategories())
  }

  render(){
    return(
      <div className="categories-container">
      <h4 className="categories-header"><Link to="/">Home</Link></h4>
      <ul className="categories">
        {this.props.categories && this.props.categories.map(c => (
          <li key={c.name} className={"category " + ( c.path === this.props.selectedCategory ? "selected" : "" )}>
            <Link
              to={"/category/" + c.path}
              className="link">{c.name}</Link>
          </li>
        ))}
      </ul>
      </div>
    )
  }
}

//export default Categories

function mapStateToProps ( state ) {
  //console.log('mapStateToProps:', state)
  let selectedCategory = "";
  if ( state.posts.selectedTarget && 'value' in state.posts.selectedTarget ){
    switch (state.posts.selectedTarget.type){
      case 'category':
        selectedCategory = state.posts.selectedTarget.value
        break;
      case 'postId':
        selectedCategory = state.posts.list.reduce((selectedCategory, p, idx) => { if(idx === 0){ return p.category }else{ return ""} }, "")
        break;
      default:
        selectedCategory = ""
        break;
    }
  }else{
    selectedCategory = state.posts.list.reduce((selectedCategory, p, idx) => { if(idx === 0){ return p.category }else{ return ""} }, "")
  }

  return {
    categories: state.categories.list,
    selectedCategory: selectedCategory
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Categories))
