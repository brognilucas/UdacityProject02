import React, { Component } from 'react';
import './App.css';
import { handleGetInitialData } from '../Redux/actions/shared'
import HomePage from './HomePage';
import PostDetail from './PostDetail'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CommentForm from './CommentForm';
class App extends Component {

  state = {
    order: "voteScore",
    inModal: true
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch((handleGetInitialData()))
  }

  changeOrder(order) {
    this.setState(() => ({
      order
    }))
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact render={() => (
            <HomePage order={this.state.order} changeOrder={(e) => this.changeOrder(e)} />
          )} />
          <Route exact path='/:category' render={() => (
            <HomePage order={this.state.order} changeOrder={(e) => this.changeOrder(e)} />
          )} />
          <Route path='/post/:id' component={PostDetail} />
          <Route exact path='/post/:id/comment' component={CommentForm}/>
          <Route exact path='/post/:id/comment/:commentId' component={CommentForm}/>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
