import React, { Component } from 'react'
import { AxiosIndexTopic } from '../../api/index'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './home.less'
import filter from '../../data/tab.js'
import tabs from '../../data/tabs.js'

class Home extends Component {
  static PropTypes = {
    tabs: PropTypes.array.isRequored
  };

  constructor(props) {
    super();
    this.state = {
      posts: []
    };

    this.tabclick = this.tabclick.bind(this)
  }

  // 生命周期
  async componentDidMount() {
    try {
      let posts = await AxiosIndexTopic('all')
      this.setState({posts: posts.data})
    } catch (e) {
      console.log(e);
    }
  }

  tabclick(props){

  }

  render() {
    const items = this.state.posts;

    return (
      <div className="Home">
        <div>
          {
            tabs && tabs.map((v,key) =>(
              <span key = {key} onClick={this.tabclick}>
                <Link to={{
                    search: `?tab=${v.url}`,
                }}>
                  {v.title}
                </Link>
              </span>
            ))
          }
        </div>
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
