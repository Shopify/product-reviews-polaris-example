import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
  EmptyState,
  Page,
  Card,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText,
  ResourceList,
} from '@shopify/polaris';

import {settings} from '../icons';
import ReviewListItem from '../components/ReviewListItem';

function ReviewList(props) {
  const {
    data: {loading, reviews},
  } = props;

  if (loading) {
    return (
      <Page
        title="Product reviews"
        secondaryActions={[
          {icon: settings, content: 'Settings', url: '/settings'},
        ]}
      >
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
      </Page>
    );
  }

  const pageContent =
    reviews.length === 0 ? (
      <EmptyState
        heading="You haven't received any reviews yet"
        action={{content: 'Configure settings'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="/review-empty-state.svg"
      >
        <p>Once you have received reviews they will display on this page.</p>
      </EmptyState>
    ) : (
      <Card>
        <ResourceList
          showHeader
          resourceName={{singular: 'review', plural: 'reviews'}}
          items={reviews}
          renderItem={(review) => <ReviewListItem {...review} />}
        />
      </Card>
    );

  return (
    <Page
      title="Product reviews"
      secondaryActions={[
        {icon: settings, content: 'Settings', url: '/settings'},
      ]}
    >
      {pageContent}
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
