import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

function ReviewList(props) {
  const {
    data: {loading, reviews},
  } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{reviews.length} reviews</div>;
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
