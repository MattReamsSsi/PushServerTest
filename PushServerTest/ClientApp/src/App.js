import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import MessageDataView from './components/MessageDataView';
import ApiClientsView from './components/ApiClientsView';
import UserDataView from './components/UserDataView';

import './custom.css'

const App = () =>  {
  return (
    <Layout>
      <Route exact path='/' component={ApiClientsView} />
      <Route path='/user-data' component={UserDataView} />
      <Route path='/message-data' component={MessageDataView} />
      <Route path='/api-clients' component={ApiClientsView} />
    </Layout>
  );
}

export default App;
