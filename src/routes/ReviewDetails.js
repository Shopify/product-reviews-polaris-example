import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import NotFound from './NotFound';

function ReviewDetails(props) {
  const {
    data: {loading, review},
  } = props;

  if (loading) {
    return <div>loading...</div>;
  }

  if (!review) {
    return <NotFound />;
  }

  return <div>{review.title}</div>;
}

export default graphql(
  gql`
    query ReviewQuery($id: Int!) {
      review(id: $id) {
        id
        rating
        title
        content
        status
        date
        customer {
          name
          email
        }
        product {
          name
          reviewCount
          averageRating
        }
      }
    }
  `,
  {
    options: ({
      match: {
        params: {id},
      },
    }) => ({variables: {id: parseInt(id, 10)}}),
  },
)(ReviewDetails);
