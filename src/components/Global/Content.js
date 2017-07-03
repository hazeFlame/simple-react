import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './css/Header.css';

class Content extends Component {
  static PropTypes = {
    body: PropTypes.object.isRequored
  };


  render() {
    const { body } = this.props;

    return (
      <div className="Content">
        { body }
      </div>
    );
  }
}

export default Content;
