import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Page,
  EmptyState,
  Card,
  ResourceList,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';

import ReviewListItem from '../components/ReviewListItem';
import {settings} from '../icons';

function ReviewList({data: {loading, reviews}}) {
  /* Comment or uncomment the next two lines to toggle the loading state */
  // loading = true;
  // reviews = null;

  /* Comment or uncomment the next line to toggle the empty state */
  // reviews = [];

  const loadingStateContent = loading ? (
    <Card sectioned>
      <TextContainer>
        {/* Let's add skeleton content from the style guide playground here */}
        {/* First, go to https://polaris.shopify.com to view the style guide.*/}
        {/* Use the search bar (top right) to find "skeleton" components. */}
        {/* Look at the different examples provided by selecting from the example menu at the top of the component pages. */}
        {/* Use skeleton components to replace these comments! */}
      </TextContainer>
    </Card>
  ) : null;

  const emptyStateContent =
    reviews && reviews.length === 0 ? (
      <EmptyState
        heading="You haven't received any reviews yet"
        // add an "action" prop that links to the '/settings' route
        image="/review-empty-state.svg"
      >
        <p>Once you have received reviews they will display on this page.</p>
      </EmptyState>
    ) : null;

  const reviewsIndex =
    reviews && reviews.length > 0 ? (
      <Card>{/* add a ResourceList of reviews here... */}</Card>
    ) : null;

  return (
    <Page title="Product reviews">
      {emptyStateContent}
      {loadingStateContent}
      {reviewsIndex}
    </Page>
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
