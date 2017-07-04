import React, { Component } from 'react';
import { AxiosTopicContent } from '../../api/index'
import './index.less'

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
      let content = await AxiosTopicContent(topic_id)
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
      </div>
    )
  }
}

export default Topic;
