import React, { Component } from 'react';
import { AxiosUserLoginname } from '../../api/index'
import { Link } from 'react-router-dom'
import './user.less'
import { Card } from 'antd'

let Recenttopics = props =>{
  const { recenttopics } = props;
  return (
    <div>
      {
        recenttopics && recenttopics.map((v,key) =>(
          <div key={key} className="recentitem">
            <Card bodyStyle={{ padding: 10 }}>
              <img src={v.author.avatar_url} />
              <div>
                <span>{v.last_reply_at}</span>
                <Link to={{
                  pathname:`/topics/${v.id}`
                }}>
                  <p>{v.title}</p>
                </Link>
              </div>
              </Card>
          </div>
        ))
      }
    </div>
  )
}

let Recentreplies = props =>{
  const recentreplies = props.recentreplies;
  return (
    <div>
      {
        recentreplies && recentreplies.map((v,key) =>(
          <div key={key} className="recentitem">
            <Card bodyStyle={{ padding: 10 }}>
              <Link to={{
                pathname:`/user/${v.author.loginname}`
              }}>
                <img src={v.author.avatar_url} />
              </Link>
              <div>
                <span>{v.last_reply_at}</span>
                <Link to={{
                  pathname:`/topics/${v.id}`
                }}>
                  <p>{v.title}</p>
                </Link>
              </div>
            </Card>
          </div>
        ))
      }
    </div>
  )
}

class Topic extends Component {
  constructor(props) {
    super();
    this.state = {
      content: []
    };
  }

  async AxiosUser(match){
    try {
      let loginname = match.params.loginname;
      let content = await AxiosUserLoginname(loginname);
      this.setState({ content: content.data })
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount(props) {
    const { match } = this.props
    this.AxiosUser(match)
  }

  componentWillReceiveProps(nextProps){
    const { match } = nextProps
    this.AxiosUser(match)
  }

  render() {
    const { content } = this.state
    return(
      <div className="User">
        <Card bordered={false} bodyStyle={{ padding: 10 }} className="userinfo">
          <div className="custom-image">
            <img alt="example" width="100%" src={content.avatar_url} />
          </div>
          <div className="custom-card">
            <p>积分：{content.score}</p>
            <p>github：<a href={'https://github.com/' + content.githubUsername} target="_blank"> @{content.githubUsername}</a></p>
            <h3>{content.create_at}</h3>
          </div>
        </Card>
        <div className="recenttopics">
          <h4>最近参与的话题</h4>
          <Recentreplies recentreplies = {content.recent_replies} />
        </div>
        <div className="recenttopics">
          <h4>最近创建的话题</h4>
          <Recenttopics recenttopics = {content.recent_topics} />
        </div>
      </div>
    )
  }
}

export default Topic;
