import React, { Component } from 'react';
import { AxiosTopicContent } from '../../api/index'

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
      console.log(match.params.id)
      let content = await AxiosTopicContent(match.params.id)
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
          <img src={content.author.avatar_url}/>
        </div>
      </div>
    )
  }
}

export default Topic;
