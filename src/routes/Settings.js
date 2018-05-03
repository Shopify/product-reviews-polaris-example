import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {
  Form,
  Page,
  Layout,
  Card,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText,
} from '@shopify/polaris';

class Settings extends React.Component {
  state = {
    autoPublish: false,
    email: '',
    emailNotifications: false,
    emailError: false,
  };

  static getDerivedStateFromProps({settingsQuery}) {
    if (settingsQuery.loading) {
      return null;
    }

    const {
      settings: {autoPublish, email, emailNotifications},
    } = settingsQuery;

    return {autoPublish, email, emailNotifications};
  }

  render() {
    const {loading} = this.props;
    const {autoPublish, email, emailNotifications, emailError} = this.state;

    const loadingStateContent = loading ? (
      <Layout>
        <Layout.AnnotatedSection
          title="Auto publish"
          description="Automatically check new reviews for spam and then publish them."
        >
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Email settings"
          description="Choose if you want to receive email notifications for each review."
        >
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    ) : null;

    const autoPublishSelected = autoPublish ? ['enabled'] : ['disabled'];

    const settingsFormContent = !loading ? (
      <Layout>
        <Layout.AnnotatedSection
          title="Auto publish"
          description="Automatically check new reviews for spam and then publish them."
        >
          <Card sectioned>
            {/* The choice list for the auto publish form field goes here */}
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Email settings"
          description="Choose if you want to receive email notifications for each review."
        >
          <Card sectioned>
            {/* The email notification form field goes here */}
          </Card>;
        </Layout.AnnotatedSection>
      </Layout>
    ) : null;

    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Page
          title="Settings"
          breadcrumbs={[{content: 'Product reviews', url: '/'}]}
        >
          {loadingStateContent}
          {settingsFormContent}
        </Page>
      </Form>
    );
  }

  @autobind
  handleAutoPublishChange(value) {
    const autoPublish = value[0] === 'enabled';
    this.setState({autoPublish});
  }

  @autobind
  handleEmailNotificationChange(receiveNotifications) {
    const {email} = this.state;
    const emailError =
      receiveNotifications && email === ''
        ? 'Enter an email to get review notifications.'
        : undefined;
    this.setState({emailNotifications: receiveNotifications, emailError});
  }

  @autobind
  handleEmailChange(value) {
    const emailError =
      value === '' ? 'Enter an email to get review notifications.' : false;
    this.setState({email: value, emailError});
  }

  @autobind
  handleFormSubmit() {
    const {updateSettingsMutation} = this.props;
    const {autoPublish, emailNotifications, email, emailError} = this.state;

    if (emailError) {
      return;
    }

    updateSettingsMutation({
      variables: {
        autoPublish,
        emailNotifications,
        email,
      },
    });
  }
}

export default compose(
  graphql(
    gql`
      query SettingsQuery {
        settings {
          autoPublish
          emailNotifications
          email
        }
      }
    `,
    {
      name: 'settingsQuery',
    },
  ),
  graphql(
    gql`
      mutation updateSettings(
        $autoPublish: Boolean
        $emailNotifications: Boolean
        $email: String
      ) {
        updateSettings(
          autoPublish: $autoPublish
          emailNotifications: $emailNotifications
          email: $email
        ) {
          autoPublish
          emailNotifications
          email
        }
      }
    `,
    {
      name: 'updateSettingsMutation',
    },
  ),
)(Settings);
