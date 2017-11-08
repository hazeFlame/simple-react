//  Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';


//  Assets
// import './css/Header.css';

class Header extends Component {
  static PropTypes = {
    items: PropTypes.array.isRequored
  };
  constructor(props) {
    super();
    this.state = {

    }
  }
  
  
  render() {
    const { items } = this.props
    return (
      <Menu mode="horizontal">
        {items && items.map( (v,key) => (
            <Menu.Item key={ key }>
              <Link to={{
                pathname: `${v.url}`,
              }}>
                {v.title}
              </Link>
            </Menu.Item>
          ))}
      </Menu>
    );
  }
}

export default Header;
