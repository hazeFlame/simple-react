import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Input, Button, notification  } from 'antd';
import './islogin.less'
import { AxiosLogin } from '../../api'
import * as circle from '../../data/localstorage'
import { log } from '../../data/utils'

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Token无效',
        description: '无效的Token',
    });
};

class Contact extends Component {
    constructor(props) {
        super();
        this.state = {
            inputValue: '22bf664b-e6bc-4795-bd87-b2a442040e86',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount(props){
        console.log(this.props)
        const { history } = this.props
        if (circle.getlocalstorage('token')){
            history.push('/')
            this.setState({
                inputValue: circle.getlocalstorage('token')
            })
        }
    }

    handleSubmit(props){
        const { history } = this.props
        AxiosLogin({
            'accesstoken': this.state.inputValue,
        })
        .then(res =>{
            if(res){
                circle.setlocalstorage('token', this.state.inputValue)
                circle.setlocalstorage('avatar_url', res.avatar_url)
                circle.setlocalstorage('id', res.id)
                circle.setlocalstorage('loginname', res.loginname)
                history.push('/')
            } else { 
                openNotificationWithIcon('error')
                circle.clearlocalstorage()
            }
        })
    }

    // 22bf664b-e6bc-4795-bd87-b2a442040e86
    handleInputChange(e){
        this.setState({
            inputValue: e.target.value
        })
    }
 
    render() {
        return (
           <div className="login">
               <div className="passwordwrap">
                    <div className="token">
                        <Input placeholder="输入您的Token" onChange={(e) => this.handleInputChange(e)} onPressEnter={this.handleSubmit} value={this.state.inputValue}/>
                    </div>
                    <div className="loginbtn">
                        <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                    </div>
               </div>
           </div>
        );
    }
}

export default Contact;
