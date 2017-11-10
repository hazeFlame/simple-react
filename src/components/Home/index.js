import React, { Component } from 'react'
import { AxiosIndexTopic } from '../../api/index'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import { OverPack } from 'rc-scroll-anim';
// import TweenOne from 'rc-tween-one';
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

    // switch (props) {
    //     case props.top === true:
    //         return <Tag color="orange">顶置</Tag>;
    //         break;
    //     case props.good === true:
    //         return <Tag color="blue">精华</Tag>;
    //         break;
    //     case props.tag === 'share':
    //         return <Tag color="purple">分享</Tag>;
    //         break;
    //     case props.tag === 'ask':
    //         return <Tag color="pink">问答</Tag>;
    //         break;
    //     case props.tag === 'job':
    //         return <Tag color="green">招聘</Tag>;
    //         break;
    //     default:
    //         return <Tag color="red">其他</Tag>;
    // }
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
        super();
        this.state = {
            posts: []
        };
    }

    async Axios(tab = 'all'){
        try {
            let posts = await AxiosIndexTopic(tab)
            this.setState({ posts: posts.data })
        } catch (e) {
            console.log(e);
        }
    }

    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results == null ? "" : decodeURIComponent(results[1]);
    }

    componentWillMount(props) {
        this.Axios(this.getParameterByName('tab'))
    }

    componentWillReceiveProps(nextProps){
        this.Axios(this.getParameterByName('tab'))
    }

    render() {
        const items = this.state.posts;
        return (
            <div className="Home" ref={node => this.contentNode = node}>
                <Menudate tabs={tabs}></Menudate>
                <QueueAnim>
                    {
                        items && items.map((v, key) => (
                        <Card key={key} >
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
                        </Card>))
                    }
                </QueueAnim>
            </div>
        )
    }
}

export default Home;
