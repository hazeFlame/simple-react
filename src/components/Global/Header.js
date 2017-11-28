import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Avatar, Popover, Button  } from 'antd';
import * as circle from '../../data/localstorage'
import './css/Header.less';
import { AxiosUserLoginname } from '../../api/index'
import { observer } from "mobx-react";
import { observable } from 'mobx';
import Store from "../../store/headerlogin"

let IsLogin = observer((props) =>(
    circle.getlocalstorage('token') ? (
      <Popover placement="bottomRight" title={circle.getlocalstorage('loginname')} content={(
        <div>
          {!Store.count ? <p>积分：{props.data.content.score}</p> : <p>积分：{Store.count}</p>  }
            <Button style={{ marginTop: 10 }} type="danger" onClick={props.loginout}>登出</Button>
          </div>
        )} trigger="hover">
          <Avatar src={circle.getlocalstorage('avatar_url')} />
        </Popover>
    ):(
      <div>
        <Link to={{
          pathname: '/login/',
        }}>
          登录
            </Link>
      </div>
    )
  )
)

const Header = observer (class Header extends Component {
  static PropTypes = {
    items: PropTypes.array.isRequored
  };
  constructor(props) {
    super();
    this.state = {
      content:[]
    }
    this.loginout = this.loginout.bind(this)
  }

  async AxiosUser() {
    try {
      let content = await AxiosUserLoginname(circle.getlocalstorage('loginname'));
      this.setState({ content: content.data })
    } catch (e) {
      console.log(e);
    }
  }

  loginout(){
    this.props.history.push("/")
    circle.clearlocalstorage()
  }

  componentDidMount(props) {
    if (circle.getlocalstorage('loginname')){
      this.AxiosUser()
    }
  }

  render() {
    const { items } = this.props
    return (
      <div className="Header">
        <Menu mode="horizontal">
          {items && items.map((v, key) => (
            <Menu.Item key={key}>
              <Link to={{
                pathname: `${v.url}`,
              }}>
                {v.title}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className="islogin">
          <IsLogin loginout={this.loginout} data={this.state} />
        </div>
      </div>
    );
  }
})

export default withRouter(Header);
