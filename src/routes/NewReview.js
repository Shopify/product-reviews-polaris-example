import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  Page,
  Form,
  FormLayout,
  TextField,
  Button,
} from '@shopify/polaris';

class NewReview extends React.Component {
  state = {
    name: '',
    avatar: '',
    productName: '',
    rating: 0,
    title: '',
    comments: '',
  };

  render() {
    const {username, avatar, productName, rating, title, comments} = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Page
          title="New Review"
        >
          <FormLayout>
            <FormLayout.Group>
              <TextField
                value={username}
                type="text"
                label="Username"
                onChange={this.handleChange('username')}
              />
              <TextField
                value={avatar}
                type="text"
                label="Avatar"
                onChange={this.handleChange('avatar')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                value={productName}
                type="text"
                label="Product Name"
                onChange={this.handleChange('productName')}
              />
              <TextField
                value={rating}
                type="number"
                label="Rating"
                onChange={this.handleChange('rating')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                value={title}
                type="text"
                label="Title"
                onChange={this.handleChange('title')}
              />
              <TextField
                value={comments}
                label="Comments"
                type="text"
                onChange={this.handleChange('comments')}
              />
            </FormLayout.Group>
            <Button submit primary>Submit</Button>
          </FormLayout>
        </Page>
      </Form>
    );
  }

  @autobind
  handleChange(field) {
    return (value) => this.setState({[field]: value});
  }

  @autobind
  handleSubmit() {
    const {saveNewReviewMutation} = this.props;
    const {username, avatar, productName, rating, title, comments} = this.state;

    saveNewReviewMutation({
      variables: {
        username,
        avatar,
        productName,
        rating,
        title,
        comments,
      },
    });
  }
}

export default compose(
  graphql(
    gql`
      mutation newReview(
        $username: String
        $avatar: String
        $productName: String
        $rating: Int
        $title: String
        $comments: String
      ) {
        saveNewReview(
          username: $username,
          avatar: $avatar,
          productName: $productName,
          rating: $rating,
          title: $title,
          comments: $comments,
        ) {
          name,
          avatar,
          productName,
          rating,
          title,
          comments,
        }
      }
    `,
    {
      name: 'saveNewReviewMutation',
    },
  ),
 )(NewReview);
