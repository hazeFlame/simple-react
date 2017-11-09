import React, { Component } from 'react';
import { AxiosTopicContent } from '../../api/index'
import { Link } from 'react-router-dom'
import { Avatar, Card, Icon } from 'antd'
import './index.less'

let Replies = (props) =>{
  const replies = props.replies;
  return (
    <div className="Card">
      {
        replies && replies.map((v,key) =>
          <Card key={key} className="replies_name">
            <div className="custom-image">
              <Link to={{
                pathname: `/user/${v.author.loginname}`,
              }}>
                <Avatar className="avatar_url" src={v.author.avatar_url} />
                <span className="author_name">{v.author.loginname}</span>
              </Link>
              <div className="indexkey">
                <em>#{key + 1}</em>
                <Icon type="like" />{v.ups.length}
              </div>
            </div>
            <div className="custom-card">
              <div className="topic_content" dangerouslySetInnerHTML={{ __html: v.content }}></div>
            </div>
          </Card>
        )
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
    console.log(content)
    return (
      <div className="Topic">
        <div className= "Topic_Avatar">
          {
            content.author ? (
              <Avatar className="avatar_url" src={content.author.avatar_url} />
            ):null
          }
        </div>
        <div className="Topic_content" dangerouslySetInnerHTML={{ __html:content.content}} />
        <div className="Topic_count">
          <h4>{content.reply_count}条回复</h4>
        </div>
        <Replies replies = {content.replies}/>
      </div>
    )
  }
}

export default Topic;
