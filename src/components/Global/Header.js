//  Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


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
    // console.log(items)
    return (
      <Menu mode="horizontal">
        {/* <Menu.Item>
          <Link to="/">首页</Link>
        </Menu.Item>
        <SubMenu title={<span>世界</span>}>
          <Menu>
            <Menu.Item>
              <Link to="/good">世界观</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/good">阵营机构</Link>
            </Menu.Item>
          </Menu>
        </SubMenu>
        <Menu.Item>
          <Link to="/share">角色</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/all">万界图书馆</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/all">阴影网络</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/all">活动</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/all">话题</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/all">圆桌会议</Link>
        </Menu.Item> */}
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
