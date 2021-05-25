import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import ApiClientsView from './components/ApiClientsView';
import UserDataView from './components/UserDataView';

import './custom.css'

const App = () =>  {
  return (
    <Layout>
      <Route exact path='/' component={ApiClientsView} />
      <Route path='/api-clients' component={ApiClientsView} />
      <Route path='/user-data' component={UserDataView} />
    </Layout>
  );
}

export default App;
