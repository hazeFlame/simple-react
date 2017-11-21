import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Avatar, Popover, Button } from 'antd';
import * as circle from '../../data/localstorage'
import { AxiosCreateTopic } from '../../api/index'
import { observer } from "mobx-react";
import { observable } from 'mobx';
import MyEditor from './editor.js'

class Header extends Component {
    static PropTypes = {
        items: PropTypes.array.isRequored
    };
    constructor(props) {
        super();
    }

    componentDidMount(props) {
        
    }

    render() {
        return (
            <div className="Createtopic">
                <div>1</div>
                <MyEditor />
            </div>
        );
    }
}

export default Header;
