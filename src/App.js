import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient();

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <p>Hello world</p>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
