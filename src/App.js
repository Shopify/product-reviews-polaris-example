import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {AppProvider, Page, EmptyState} from '@shopify/polaris';

import '@shopify/polaris/styles.css';

const client = new ApolloClient();

class App extends Component {
  render() {
    const emptyState = <EmptyState heading="You haven't received any reviews yet" action={{ content: "Configure settings" }} secondaryAction={{ content: "Learn more", url: "https://help.shopify.com" }} image="https://uploads.codesandbox.io/uploads/user/1235c92d-7d36-443f-81d7-db0974fe238d/Ffo4-Product.svg">
        <p>
          Once you have received reviews they will display on this page.
        </p>
      </EmptyState>;

    return <AppProvider>
        <ApolloProvider client={client}>
            <Page title="Product reviews">
                {emptyState}
            </Page>
        </ApolloProvider>
      </AppProvider>;
  }
}

export default App;
