// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// Components
import App from '../components/App'
import About from '../components/About'
import Contact from '../components/Contact'
import Login from '../components/Login'
import Home from '../components/Home'
import Topic from '../components/Topic'
import User from '../components/User'
import Page404 from '../components/Page404'
import Createtopic from '../components/CreateTopic/createtopic.js'

const AppRoutes = () => {
  return(
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/all/" component={About} />
        <Route exact path="/good/" component={Contact} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/topic/create/" component={Createtopic} />
        <Route exact path="/topics/:id" component={Topic}/>
        <Route exact path="/user/:loginname" component={User}/>
        <Route component={Page404} />
      </Switch>
    </App>
  )
}

export default AppRoutes;
