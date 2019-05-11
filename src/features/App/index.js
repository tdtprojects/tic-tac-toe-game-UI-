import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Game from '../Game';
import GameOnline from '../GameOnline';
import Modal from '../Modals';
import configureStore from '../../utils/configureStore';

import './index.scss';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/online" exact component={GameOnline} />
      <Route path="/" exact component={Game} />
      <Modal />
    </Router>
  </Provider>
);

export default App;
