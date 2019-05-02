import React from 'react';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import {
    AppProvider,
    Form,
    FormLayout,
    TextField,
    Button,
    Card,
    Page,
} from '@shopify/polaris';
import CreateReviewMutation from './CreateReviewMutation';

class ReviewForm extends React.Component {
  state = {
    // avatar: '',
    name: '',
    product: '',
    rating: 0,
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, product, rating} = this.state;

    this.props.mutate({
      variables: {
        // avatar,
        name,
        product,
        rating,
      },
    });
  };

  render() {
    const {avatar, name, product, rating} = this.state;

    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          {/* <input
            type="text"
            name="avatar"
            value={avatar}
            placeholder="Avatar"
            onChange={this.handleChange}
          /> */}
          <TextField
            value={name}
            onChange={this.handleChange('name')}
            label="Name"
            type="name"
          />
          <TextField
            value={product}
            onChange={this.handleChange('productName')}
            label="Product"
            type="product"
          />
          <input
            type="number"
            name="rating"
            // placeholder="Rating"
            min={1}
            max={5}
            // value={rating}
            onChange={this.handleChange}
          />
          <Button submit>Submit</Button>
        </form>
      </section>
    );
  }
}
export default graphql(CreateReviewMutation)(ReviewForm);
