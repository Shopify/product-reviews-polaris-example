import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  Card,
  Page,
  Layout,
  Form,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  FormLayout,
  Checkbox,
  TextField,
  Button,
  Select,
} from '@shopify/polaris';

class NewReview extends React.Component {
  state = {
    review: {
      name: '',
      avatar: '',
      productName: '',
      rating: 0,
      title: '',
      comments: '',
    },
  };

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Page
          title="New Review"
        >
          <FormLayout>
            <FormLayout.Group>
              <TextField type="text" label="Username" />
              <TextField type="text" label="Avatar" />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField type="text" label="Product Name" />
              <TextField type="number" label="Rating" />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField type="text" label="Title" />
              <TextField
                label="Comments"
                type="text"
              />
            </FormLayout.Group>
            <Button submit primary>Submit</Button>
          </FormLayout>
        </Page>
      </Form>
    );
  }
  @autobind
  handleSubmit() {
    const {saveNewReviewMutation} = this.props;
  }

  @autobind
  handleChange(field) {
    return (value) => this.setState({[field]: value});
  }

}

export default compose(
  graphql(
    gql`
      mutation addReview(
        $autoPublish: Boolean
        $emailNotifications: Boolean
        $email: String
      ) {
        id
      }
    `,
    {
      name: 'addReviewMutation',
    },
  ),
 )(NewReview);
