import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Categories from './categories/components'
import Posts from './posts/components'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={()=>(
            <div>
              <Categories />
              <Posts />
            </div>
          )}></Route>
          <Route exact path='/category/:path' render={(args) => {
            return (
              <div>
                <Categories />
                <Posts selectedCategory={args.match.params.path}/>
              </div>
            )
          }}></Route>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ( state ) {
  //console.log('mapStateToProps:', state)
  return {

  }
}

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(App)
