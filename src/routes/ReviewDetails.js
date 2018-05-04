import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Avatar,
  Badge,
  Card,
  TextStyle,
  Page,
  Layout,
  Stack,
  Thumbnail,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';

import NotFound from './NotFound';
import Rating from '../components/Rating';

function ReviewDetails(props) {
  const {
    data: {loading, review},
  } = props;

  if (loading) {
    return (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card title="Review" sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }

  if (!review) {
    return <NotFound />;
  }

  const badge =
    review.status === 'published' ? (
      <Badge>Published</Badge>
    ) : (
      <Badge>Unpublished</Badge>
    );

  return (
    <Page
      title={review.title}
      breadcrumbs={[{content: 'All reviews', url: '/'}]}
    >
      <Card title="Review" sectioned>
        {/*
        This is the main content of our review details card.
        We will be introducing a stack component here to lay this content out.*/}

        {/*
        <Avatar customer name={review.customer.name} />
        <p>{review.customer.name}</p>
        {badge}
        <Rating value={review.rating} />
        <p>{review.content}</p>
        */}
      </Card>

      <Card>
        <Card.Section>
          <Stack alignment="center" distribution="equalSpacing">
            <Stack alignment="center">
              <Thumbnail
                source="https://cdn.shopify.com/s/files/1/1602/3257/products/paste-prod_thumb.jpg"
                alt=""
                size="medium"
              />
              <TextStyle variation="strong">{review.product.name}</TextStyle>
            </Stack>
            <Stack>
              <Rating value={review.product.averageRating} />
              <p>{review.product.reviewCount} reviews</p>
            </Stack>
          </Stack>
        </Card.Section>
      </Card>
    </Page>
  );
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
