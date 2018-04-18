import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';

import ReviewList from './routes/ReviewList';
import ReviewDetails from './routes/ReviewDetails';
import Settings from './routes/Settings';
import NotFound from './routes/NotFound';

import '@shopify/polaris/styles.css';

const client = new ApolloClient();

const CustomLinkComponent = ({children, url, ...rest}) => {
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
};

function App() {
  return (
    <AppProvider linkComponent={CustomLinkComponent}>
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
    </AppProvider>
  );
}

export default App;
