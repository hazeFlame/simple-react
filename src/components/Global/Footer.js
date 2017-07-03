import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './css/Header.css';

class Footer extends Component {
  static PropTypes = {
    copyright: PropTypes.string
  }

  render() {
    const { copyright } = this.props
    return (
      <div className="Footer">
        <p dangerouslySetInnerHTML={{ __html:copyright }} />
      </div>
    );
  }
}

export default Footer;
