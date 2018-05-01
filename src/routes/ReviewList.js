import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Page} from '@shopify/polaris';

function ReviewList({data: {loading, reviews}}) {
  return (
    <Page title="Product reviews">{/* Our page content will go here. */}</Page>
  );
}

export default graphql(gql`
  query ReviewsQuery {
    reviews {
      id
      title
      status
      date
      customer {
        name
      }
      product {
        name
      }
    }
  }
`)(ReviewList);
