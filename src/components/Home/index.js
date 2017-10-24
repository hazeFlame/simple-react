import React, { Component } from 'react'
import { AxiosIndexTopic } from '../../api/index'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Tag,
} from 'antd';
import './home.less'
// import filter from '../../data/tab.js'
// import tabs from '../../data/tabs.js'


let scrollTop = 0

let Gettags = props =>{
    const { tag, top } = props
    if( top ){
      return <Tag color="orange">顶置</Tag>
    }else{
      if (tag === 'share') {
        return <Tag color="purple">分享</Tag>
      } else if (tag === 'ask') {
        return <Tag color="pink">问答</Tag>
      } else if (tag === 'job') {
        return <Tag color="green">招聘</Tag>
      } else if (tag === 'good') {
        return <Tag color="blue">精华</Tag>
      } else {
        return <Tag color="red">其他</Tag>
      }
    }
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

    // this.tabclick = this.tabclick.bind(this)
  }

  

  // 生命周期
  async componentDidMount() {
    try {
      let posts = await AxiosIndexTopic('all')
      this.setState({posts: posts.data})
    } catch (e) {
      console.log(e);
    }

    if (this.contentNode) {
      this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
    }
  }

  componentWillUnmount() {
    if (this.contentNode) {
      this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
    }
  }



  onScrollHandle(event) {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const isBottom = (clientHeight + scrollTop === scrollHeight)
    console.log('is bottom:' + isBottom)
  }


  render() {
    const items = this.state.posts;

    return (
      <div className="Home" ref={node => this.contentNode = node}>
        {/* {<div>
          {
            tabs && tabs.map((v,key) =>(
              <span key = {key}>
                <Link to={{
                    search: `?tab=${v.url}`,
                }}>
                  {v.title}
                </Link>
              </span>
            ))
          }
        </div>} */}
        <ul>
          {items && items.map((v, key) => (
            <li key={key}>
              {/* <img title={v.author.loginname} src={v.author.avatar_url}/> */}
              <Link to={{
                pathname: `/user/${v.author.loginname}`,
              }}>
                <Avatar title={v.author.loginname} src={v.author.avatar_url} />
              </Link>
              <div className="tag">
                <Gettags tag={v.tab} top={v.top} />
              </div>
              <div>
                <div>
                  <span title="回复数">{v.reply_count}</span>/<span title="阅读数">{v.visit_count}</span>
                  <Link to={{
                    pathname: `/topics/${v.id}`
                  }}>
                    <p title={v.title}>{v.title}</p>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Home;
