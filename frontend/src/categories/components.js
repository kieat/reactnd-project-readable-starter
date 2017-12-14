import React, { Component } from 'react';
import { connect } from 'react-redux'
import { asyncGetCategories } from './actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Categories extends Component {
  componentDidMount(){
    this.props.dispatch(asyncGetCategories(this.props.selectedTarget))
  }

  render(){
    return(
      <div className="categories-container">
          <h4 className="categories-header"><Link to="/">Home</Link></h4>
          <ul className="categories">
            {this.props.categories && this.props.categories.map(c => (
              <li key={c.name} className={"category " + ( c.path === this.props.selectedCategory ? "selected" : "" )}>
                <Link
                  to={"/" + c.path}
                  className="link">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    categories: state.categories.list,
    selectedCategory: state.posts.selectedCategory
  }
}

export default withRouter(connect(
  mapStateToProps
  //mapDispatchToProps
)(Categories))
