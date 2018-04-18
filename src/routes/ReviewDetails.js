import React from 'react';
import {Query} from 'react-apollo';
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
} from '@shopify/polaris';

import NotFound from './NotFound';
import Rating from '../components/Rating';

const reviewQuery = gql`
  query review($id: Int!) {
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
`;

export default function ReviewDetails(props) {
  const {match} = props;
  const id = match.params.id;

  return (
    <Query query={reviewQuery} variables={{id}}>
      {({loading, _error, data}) => {
        if (loading) {
          return null;
        }
        const {review} = data;

        if (!review) {
          return <NotFound />;
        }

        const badge =
          review.status === 'published' ? (
            <Badge status="success">Published</Badge>
          ) : (
            <Badge status="attention">Unpublished</Badge>
          );

        return (
          <Page
            title={review.title}
            breadcrumbs={[{content: 'All reviews', url: '/'}]}
          >
            <Layout>
              <Layout.Section>
                <Card title="Review">
                  <Card.Section>
                    <Stack vertical>
                      <Stack alignment="center" distribution="equalSpacing">
                        <Stack alignment="center">
                          <Avatar customer name={review.customer.name} />
                          <p>{review.customer.name}</p>
                        </Stack>
                        {badge}
                      </Stack>
                      <Rating value={review.rating} />
                      <p>{review.content}</p>
                    </Stack>
                  </Card.Section>
                </Card>
              </Layout.Section>
              <Layout.Section secondary>
                <Card>
                  <Card.Section>
                    <Stack alignment="center" distribution="equalSpacing">
                      <Stack alignment="center">
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/1602/3257/products/paste-prod_thumb.jpg"
                          alt=""
                          size="medium"
                        />
                        <TextStyle variation="strong">
                          {review.product.name}
                        </TextStyle>
                      </Stack>
                      <Stack>
                        <Rating value={review.product.averageRating} />
                        <p>{review.product.reviewCount} reviews</p>
                      </Stack>
                    </Stack>
                  </Card.Section>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        );
      }}
    </Query>
  );
}
