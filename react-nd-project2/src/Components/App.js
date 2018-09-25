import React, { Component } from 'react';
import './App.css';
import { handleGetInitialData } from '../Redux/actions/shared'
import HomePage from './HomePage';
import { connect } from 'react-redux'
class App extends Component {

  state = {
    order: "voteScore"
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch((handleGetInitialData()))
  }

  changeOrder(order){
    this.setState( () => ({
      order
    }))
  }

  render() {
    return (
      <div className="App">
        <HomePage order={this.state.order} changeOrder={ (e) => this.changeOrder(e) } />
      </div>
    );
  }
}

export default connect()(App);
