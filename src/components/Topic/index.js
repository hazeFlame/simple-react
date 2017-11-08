import React, { Component } from 'react';
import { AxiosTopicContent } from '../../api/index'
import { Link } from 'react-router-dom'
import './index.less'

let Replies = (props) =>{
  const replies = props.replies;
  return (
    <ul>
      {
        replies && replies.map((v,key) =>
          <li key={key} className="replies_name">
            <div>
              <Link to={{
                pathname: `/user/${v.author.loginname}`,
              }}>
                <img src={v.author.avatar_url} />
                <span>{v.author.loginname}</span>
              </Link>
              <i>{key+1}楼</i>---
              <em>{v.ups.length}赞</em>
            </div>
            <div>
              <p className="topic_content" dangerouslySetInnerHTML={{ __html:v.content}} />
            </div>
          </li>
        )
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
      let topic_id = match.params.id;
      let content = await AxiosTopicContent(topic_id);
      this.setState({content: content.data})
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { content } = this.state
    return (
      <div className="Topic">
        <div>
          {
            content.author ? (
              <img className="avatar_url" src={content.author.avatar_url} />
            ):null
          }
        </div>
        <div className="topic_content" dangerouslySetInnerHTML={{ __html:content.content}} />
        <Replies replies = {content.replies}/>
      </div>
    )
  }
}

export default Topic;
