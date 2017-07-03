//  Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//  Assets
import './css/Header.css';

class Header extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequored,
    items: PropTypes.array.isRequored
  };

  render() {
    const { title, items } = this.props;

    return (
      <div className="Header">
        <div className="Logo">
          <ul className="menu">
            {items && items.map((item,key) =>
              <li key={key}>
                <Link to={item.url}>
                  {item.title}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
