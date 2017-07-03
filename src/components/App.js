// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Header from './Global/Header'
import Footer from './Global/Footer'
import Content from './Global/Content'
// Data
import items from '../data/menu'


class App extends Component {
  static PropTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;

    return (
      <div className="App">
        <Header title="Hello React" items={ items } />
        <Content body={ children } />
        <Footer copyright="&copy; React 2017" />
      </div>
    );
  }
}

export default App;
