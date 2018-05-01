import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import ReviewList from './routes/ReviewList';
import ReviewDetails from './routes/ReviewDetails';
import Settings from './routes/Settings';
import NotFound from './routes/NotFound';

const client = new ApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={ReviewList} />
          <Route path="/reviews/:id" component={ReviewDetails} />
          <Route exact path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
