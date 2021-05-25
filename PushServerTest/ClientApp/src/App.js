import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import MessageDataView from './components/MessageDataView';
import ApiClientsView from './components/ApiClientsView';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={ApiClientsView} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/message-data' component={MessageDataView} />
        <Route path='/api-clients' component={ApiClientsView} />
      </Layout>
    );
  }
}
