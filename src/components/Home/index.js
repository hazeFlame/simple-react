import React, {Component} from 'react';
import {AxiosIndexTopic} from '../../api/index'
import {Link} from 'react-router-dom'
import './home.less'
import filter from '../../data/tab.js'

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: []
    };
  }

  // 生命周期
  async componentDidMount() {
    try {
      let posts = await AxiosIndexTopic()
      this.setState({posts: posts.data})
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const items = this.state.posts;

    return (
      <div className="Home">
        <ul>
          {items && items.map((v, key) => (
            <li key={key}>
              <img title={v.author.loginname} src={v.author.avatar_url}/>
              <i>{v.tab}</i>
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
