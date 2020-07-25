import './assets/plugins/pace/pace-theme-flash.css';
import './assets/plugins/bootstrap/css/bootstrap.min.css';
import './assets/plugins/bootstrap/css/bootstrap-theme.min.css';
import 'font-awesome/css/font-awesome.css';
import './assets/fonts/webfont/cryptocoins.css';
import './assets/css/animate.min.css';
import './assets/plugins/perfect-scrollbar/perfect-scrollbar.css';

import './assets/plugins/jvectormap/jquery-jvectormap-2.0.1.css';
import './assets/plugins/morris-chart/css/morris.css';
import './assets/plugins/calendar/fullcalendar.css';
import './assets/plugins/icheck/skins/minimal/minimal.css';

import './assets/plugins/messenger/css/messenger.css';
import './assets/plugins/messenger/css/messenger-theme-future.css';
import './assets/plugins/messenger/css/messenger-theme-flat.css';

import './assets/css/style.css';
import './assets/css/responsive.css';

import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
