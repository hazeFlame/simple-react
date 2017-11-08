import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';
import './islogin.less'
const FormItem = Form.Item;

let Num = props => {
    const { num } = props
    return (
        <div>
            {
                num && num.map((v,key) =>(
                    <span key={key}>{v}</span>
                ))
            }
        </div>
    )
}

let Aaaa = props =>{
    const { num, alert1 } = props
    return (
        <div onClick={() => alert1( num ) }>{ num }</div>
    )
}

class Contact extends Component {
    
    constructor(props) {
        super();
        this.state = {
            num:[1,2,3,4,5,6,7,8,9,7,8,9,8,4,5,6,8,9,7,4,5,6,1]
        };
        this.alert1 = this.alert1.bind(this)

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    alert1(num){
        console.log(num)
    }
 
    render() {
        const { getFieldDecorator } = this.props.form;
        const number = [1, 2, 3, 4, 5];
        
        return (
           <div className="login">
                {
                    number && number.map((v, key) => (
                        <Aaaa alert1={() => this.alert1(this)} num={v} key={key}></Aaaa>
                    ))
                }


                <div>
                    {number && number.map((v,key) =>(
                        <span onClick={() => this.alert1(v)} key={ key }>{v}</span>
                    ))}
                </div>
                

                <Num num = {this.state.num} />

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                            )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() =>{alert(1)}}>
                            Log in
          </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
           </div>
        );
    }
}
Contact = Form.create({})(Contact);
export default Contact;
