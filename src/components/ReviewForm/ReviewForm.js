import React from 'react';
import {
  graphql,
} from 'react-apollo';
import {
    TextField,
    Button,
} from '@shopify/polaris';
import CreateReviewMutation from './CreateReviewMutation';

class ReviewForm extends React.Component {
  state = {
    name: '',
    product: '',
    title: '',
    content: '',
    rating: 0,
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, product, title, content, rating} = this.state;

    this.props.mutate({
      variables: {
        name,
        product,
        title,
        content,
        rating,
      },
    });
    window.location.href = '/';
  };

  render() {
    const {name, product, title, content, rating} = this.state;

    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <TextField
            value={name}
            onChange={this.handleChange('name')}
            label="Name"
            // type="name"
          />
          <TextField
            value={product}
            onChange={this.handleChange('product')}
            label="Product"
            // type="product"
          />
          <TextField
            label="Title"
            // type="content"
            value={title}
            onChange={this.handleChange('title')}
          />
          <TextField
            label="Comments"
            // type="content"
            value={content}
            onChange={this.handleChange('content')}
          />
          <TextField
            label="Rating"
            type="number"
            name="rating"
            min={1}
            max={5}
            value={rating}
            onChange={this.handleChange('rating')}
          />
          <br />
          <Button submit>Submit</Button>
        </form>
      </section>
    );
  }
}
export default graphql(CreateReviewMutation)(ReviewForm);
