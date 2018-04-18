import React from 'react';
import {Avatar, Badge, ResourceList, Stack, TextStyle} from '@shopify/polaris';

import './ReviewListItem.css';

export default function ReviewListItem(props) {
  const {id, title, date, product, customer, status} = props;

  const badge =
    status === 'published' ? (
      <Badge status="success">Published</Badge>
    ) : (
      <Badge status="attention">Unpublished</Badge>
    );

  const media = <Avatar customer name={customer.name} />;

  return (
    <ResourceList.Item id={id} url={`/reviews/${id}`} media={media}>
      <div className="ReviewListItem">
        <div className="ReviewListItem__Content">
          <h3>
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          <TextStyle variation="subdued">
            by {customer.name} on {product.name}
          </TextStyle>
        </div>
        <div className="ReviewListItem__MetaData">
          <Stack spacing="tight">
            {badge}
            <TextStyle variation="subdued">{date}</TextStyle>
          </Stack>
        </div>
      </div>
    </ResourceList.Item>
  );
}
