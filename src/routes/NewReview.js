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
  ChoiceList,
  FormLayout,
  Checkbox,
  TextField,
  Button,
} from '@shopify/polaris';

class NewReview extends React.Component {
  state = {
    newsletter: false,
    email: '',
  };

  render() {
    const {newsletter, email} = this.state;

    const handleSubmit = (event) => {
      this.setState({newsletter: false, email: ''});
    };

    const handleChange = (field) => {
      return (value) => this.setState({[field]: value});
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormLayout>
          <Checkbox
            label="Sign up for the Polaris newsletter"
            checked={newsletter}
            onChange={this.handleChange('newsletter')}
          />

          <TextField
            value={email}
            onChange={this.handleChange('email')}
            label="Email"
            type="email"
            helpText={
              <span>
                We’ll use this email address to inform you on future changes to
                Polaris.
              </span>
            }
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    );
  }

}

export default NewReview;
