import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Categories from './categories/components'
import Posts from './posts/components'
import CreatePost from './posts/create/component'
import EditPost from './posts/edit/component'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={()=>(
            <div>
              <Categories />
              <Posts selectedTarget={({type: 'category', value: null})} />
            </div>
          )}></Route>

          <Switch>
            <Route exact path='/edit_post/:id' render={(args) => {
              return (
                <div>
                  <Categories />
                  <EditPost selectedTarget={({type: 'postId', value: args.match.params.id})}/>
                </div>
              )
            }}></Route>
            <Route exact path='/:category/:post_id' render={(args) => {
              return (
                <div>
                  <Categories />
                  <Posts selectedTarget={({type: 'postId', value: args.match.params.post_id})}/>
                </div>
              )
            }}></Route>
          </Switch>

          <Switch>
          <Route exact path='/new_post' render={(args) => {
            return (
              <div>
                <Categories />
                <CreatePost />
              </div>
            )
          }}></Route>
          <Route exact path='/:path' render={(args) => {
            return (
              <div>
                <Categories selectedTarget={({type: 'category', value: args.match.params.path})} />
                <Posts selectedTarget={({type: 'category', value: args.match.params.path})} />
              </div>
            )
          }}></Route>
          </Switch>
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
