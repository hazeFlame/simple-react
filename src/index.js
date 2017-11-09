// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Routes
import AppRoutes from './router/routes'
// Assets
import registerServiceWorker from './assets/registerServiceWorker';
import './assets/reset.css'
import 'antd/dist/antd.less';



ReactDOM.render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
