import React, { Component } from 'react'
import { AxiosIndexTopic } from '../../api/index'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
import {
    Avatar,
    Tag,
    Card,
    Tooltip,
} from 'antd';
import './home.less'
import tabs from '../../data/tabs'

let Gettags = props => {
    const { tag, top, good } = props
    if (top) {
        return <Tag color="orange">顶置</Tag>
    }else if ( good ){
        return <Tag color="blue">精华</Tag>
    } else {
        if (tag === 'share') {
            return <Tag color="purple">分享</Tag>
        } else if (tag === 'ask') {
            return <Tag color="pink">问答</Tag>
        } else if (tag === 'job') {
            return <Tag color="green">招聘</Tag>
        }else {
            return <Tag color="red">其他</Tag>
        }
    }
}

let Menudate = props => {
    const { tabs } = props
    return (
        <QueueAnim type={['top']} className="navtabs">
            {
                tabs && tabs.map((v, key) => (
                    <Tooltip key={key} placement="top" title={v.title}>
                        <Link  to={{
                            pathname: '/',
                            search:`tab=${v.url}`
                        }}>
                            {v.title}
                        </Link>
                    </Tooltip>
                ))
            }
        </QueueAnim>
    )
}



class Home extends Component {
    static PropTypes = {
        tabs: PropTypes.array.isRequored
    };

    constructor(props) {
        super(props);
        this.state = {
            topicitem: [],
            page: 1,
        };
    }

    async AxiosTopic(tab = 'all', page = this.state.page, limit = '10'){
        try {
            const { data } = await AxiosIndexTopic(tab, page, limit)
            this.setState((prevState) =>{
                return {
                    topicitem: prevState.topicitem.concat(data)
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results == null ? "" : decodeURIComponent(results[1]);
    }
    
    componentDidMount() {
        let _this = this
        window.addEventListener('scroll',function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollheight = document.documentElement.scrollheight || document.body.scrollHeight;
            if (scrollTop + clientHeight === scrollheight){
                _this.setState((prevState) => {
                    return {
                        page: prevState.page+=1
                    }
                })
                _this.AxiosTopic(_this.getParameterByName('tab'), _this.state.page)
            }
        })
    }

    componentWillMount() {
        this.AxiosTopic(this.getParameterByName('tab'))
    }

    componentWillReceiveProps(){
        this.setState({
            page:1,
            topicitem:[],
        })
        this.AxiosTopic(this.getParameterByName('tab'), 1)
    }

    render() {
        const { topicitem } = this.state;
        return (
            <div className="Home">
                <Menudate tabs={tabs}></Menudate>
                <QueueAnim type={['left','right']}>
                    {
                        topicitem && topicitem.map((v, key) => (
                            <div key={v.id}>
                            <Card >
                                <div className="custom-image">
                                    <Link to={{
                                        pathname: `/user/${v.author.loginname}`,
                                    }}>
                                        <Avatar title={v.author.loginname} src={v.author.avatar_url} />
                                    </Link>
                                    <div className="tag">
                                        <Gettags tag={v.tab} top={v.top} good={v.good} />
                                    </div>
                                    <div className="reply_count">
                                        <span title="回复数">{v.reply_count}</span>/<span title="阅读数">{v.visit_count}</span>
                                    </div>
                                </div>
                                <div className="custom-card">
                                    <Link to={{
                                        pathname: `/topics/${v.id}`
                                    }}>
                                        <p title={v.title}>{v.title}</p>
                                    </Link>
                                </div>
                            </Card>
                        </div>))
                    }
                </QueueAnim>
            </div>
        )
    }
}

export default Home;
