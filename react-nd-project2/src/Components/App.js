import React, { Component } from 'react';
import './App.css';
import { handleGetInitialData } from '../Redux/actions/shared'
import HomePage from './HomePage';
import PostDetail from './PostDetail'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CommentForm from './CommentForm';
import PostForm from './PostForm';
import { Input } from 'semantic-ui-react'
import Posts from './Posts';
class App extends Component {

  

  componentDidMount() {
    const { dispatch } = this.props

    dispatch((handleGetInitialData()))
  }


  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact component={HomePage}/>
          <Route exact path='/:category' component={HomePage}/>
          <Route path='/:category/:id' component={PostDetail} />
          <Route exact path='/post/:id/comment/new' component={CommentForm}/>
          <Route exact path='/post/:id/comment/:commentId' component={CommentForm}/>
          <Route exact path='/post/new' component={PostForm} />
          <Route exact path='/post/:category/:id' component={PostForm} />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
