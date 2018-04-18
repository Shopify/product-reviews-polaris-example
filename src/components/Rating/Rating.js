import React from 'react';
import {Icon} from '@shopify/polaris';

import './Rating.css';

import {star} from '../../icons';

export default function Rating(props) {
  const {value} = props;

  const ratings = [];

  for (let i = 0; i < 5; i++) {
    const className =
      i < Math.floor(value)
        ? 'Rating__Star Rating__Star--Filled'
        : 'Rating__Star';

    ratings.push(
      <span className={className} key={`rating-${i}`}>
        <Icon source={star} />
      </span>,
    );
  }

  return <span className="Rating">{ratings}</span>;
}
