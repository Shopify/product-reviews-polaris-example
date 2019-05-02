import React from 'react';
import {
    Page,
} from '@shopify/polaris';
import ReviewForm from '../components/ReviewForm';

export default function AddReview() {
  return (
    <Page title="New review">
      <ReviewForm />
    </Page>
  );
}
