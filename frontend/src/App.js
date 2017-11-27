import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Categories from './categories/components'

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path='/' render={()=>(
          <Categories />
        )}/>
      </div>
      </Router>
    );
  }
}

function mapStateToProps ( state ) {
  console.log('mapStateToProps:', state)
  return {

  }
}

export default connect(
  //mapStateToProps
  //mapDispatchToProps
)(App)
