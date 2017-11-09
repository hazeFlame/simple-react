import React, { Component } from 'react';
import { AxiosUserLoginname } from '../../api/index'
import { Link } from 'react-router-dom'
import './user.less'

let Recenttopics = props =>{
  const { recenttopics } = props;
  return (
    <ul>
      {
        recenttopics && recenttopics.map((v,key) =>(
          <li key={key}>
            <img src={v.author.avatar_url} />
            <div>
              <span>{v.last_reply_at}</span>
              <Link to={{
                pathname:`/topics/${v.id}`
              }}>
                <p>{v.title}</p>
              </Link>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

let Recentreplies = props =>{
  const recentreplies = props.recentreplies;
  return (
    <ul>
      {
        recentreplies && recentreplies.map((v,key) =>(
          <li key={key}>
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
          </li>
        ))
      }
    </ul>
  )
}

class Topic extends Component {
  constructor(props) {
    super();
    this.state = {
      content: []
    };
  }

  

  async componentDidMount(props) {
    const { match } = this.props
    try {
      let loginname = match.params.loginname;
      let content = await AxiosUserLoginname(loginname);
      this.setState({content: content.data})
    } catch (e) {
      console.log(e);
    }
  }

  async componentWillReceiveProps(nextProps){
    const { match } = nextProps
    try {
      let loginname = match.params.loginname;
      let content = await AxiosUserLoginname(loginname);
      this.setState({content: content.data})
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { content } = this.state
    return(
      <div className="User">
        <img src={content.avatar_url} />
        <p>{content.create_at}</p>
        <p>github:<a href={'https://github.com/'+content.githubUsername} target="_blank"> @{content.githubUsername}</a></p>
        <div className="recenttopics">
          <h4>最近创建的话题</h4>
          <Recenttopics recenttopics = {content.recent_topics} />
        </div>
        <div className="recenttopics">
          <h4>最近参与的话题</h4>
          <Recentreplies recentreplies = {content.recent_replies} />
        </div>
      </div>
    )
  }
}

export default Topic;
