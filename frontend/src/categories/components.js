import React, { Component } from 'react';
import { connect } from 'react-redux'
import { asyncGetCategories } from './actions'
import { Link } from 'react-router-dom'

class Categories extends Component {
  componentDidMount(){
    this.props.dispatch(asyncGetCategories())
  }

  render(){
    return(
      <ul className="categories">
        {this.props.categories && this.props.categories.map(c => (
          <li key={c.name}>
            <Link to="/" className="link">{c.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

//export default Categories

function mapStateToProps ( state ) {
  console.log('mapStateToProps:', state)
  return {
    categories: state.categories
  }
}

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(Categories)
