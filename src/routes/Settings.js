import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  Card,
  Page,
  Layout,
  Form,
  ChoiceList,
  Checkbox,
  TextField,
  Stack,
  PageActions,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
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

    if (loading) {
      return (
        <Page
          title="Settings"
          breadcrumbs={[{content: 'Product reviews', url: '/'}]}
        >
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
        </Page>
      );
    }

    const autoPublishSelected = autoPublish ? ['enabled'] : ['disabled'];

    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Page
          title="Settings"
          breadcrumbs={[{content: 'Product reviews', url: '/'}]}
        >
          <Layout>
            <Layout.AnnotatedSection
              title="Auto publish"
              description="Automatically check new reviews for spam and then publish them."
            >
              <Card sectioned>
                <ChoiceList
                  title="Auto publish"
                  choices={[
                    {
                      label: 'Enabled',
                      value: 'enabled',
                      helpText:
                        'New reviews are checked for spam and then automatically published.',
                    },
                    {
                      label: 'Disabled',
                      value: 'disabled',
                      helpText:
                        'You must manually approve and publish new reviews.',
                    },
                  ]}
                  selected={autoPublishSelected}
                  onChange={this.handleAutoPublishChange}
                />
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Email settings"
              description="Choose if you want to receive email notifications for each review."
            >
              <Card sectioned>
                <Stack vertical>
                  <TextField
                    value={email}
                    label="Email"
                    type="email"
                    error={emailError}
                    onChange={this.handleEmailChange}
                  />
                  <Checkbox
                    checked={emailNotifications}
                    label="Send me an email when a review is submitted."
                    onChange={this.handleEmailNotificationChange}
                  />
                </Stack>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.Section>
              <PageActions
                primaryAction={{
                  content: 'Save',
                  submit: true,
                  disabled: emailError,
                }}
              />
            </Layout.Section>
          </Layout>
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
  handleEmailNotificationChange(value) {
    const {email} = this.state;
    const emailError =
      value && email === ''
        ? 'Enter an email to get review notifications.'
        : false;
    this.setState({emailNotifications: value, emailError});
  }

  @autobind
  handleEmailChange(value) {
    const emailError =
      value === '' ? 'Enter an email to get review notifications.' : false;
    this.setState({email: value, emailError});
  }

  @autobind
  async handleFormSubmit() {
    const {updateSettingsMutation} = this.props;
    const {autoPublish, emailNotifications, email, emailError} = this.state;

    if (emailError) {
      return;
    }

    await updateSettingsMutation({
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
