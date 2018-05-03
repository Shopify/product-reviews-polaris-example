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
  FormLayout,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';

class Settings extends React.Component {
  // We initialize the state with the properties of the "data" prop we will receive as a prop from our GraphQL query (see line 192) along with a boolean "emailError" that we update when there is an error in the email text field.
  state = {
    autoPublish: false,
    email: '',
    emailNotifications: false,
    emailError: false,
  };

  // getDerivedStateFromProps is a new lifecycle method available from the 16.3 release of React onward. We use it to update the state of our component with the "settings" prop received when our GraphQL query completes. Learn more about this lifecycle method and other recent changes in this blog post https://medium.com/@baphemot/whats-new-in-react-16-3-d2c9b7b6193b
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

    // While the data loads during our GraphQL request, we render skeleton content to signify to the merchant that page data is on its way.
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
        {/* Annotated sections are useful in settings pages to give more context about what the merchant will change with each setting. */}
        <Layout.AnnotatedSection
          title="Auto publish"
          description="Automatically check new reviews for spam and then publish them."
        >
          <Card sectioned>
            {/* Choice lists display a list of checkboxes or radio buttons to gather choice input. See the style guide to learn more https://polaris.shopify.com/components/forms/choice-list */}
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
            <FormLayout>
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
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    ) : null;

    // We wrap our page component in a form component that handles form submission for the whole page. We could also handle submittal with the onClick event of the save button. Either approach works fine.
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Page
          title="Settings"
          breadcrumbs={[{content: 'Product reviews', url: '/'}]}
          primaryAction={{
            content: 'Save',
            submit: true,
            disabled: emailError,
          }}
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

    // If the merchant elects to receive email notifications by checking the checkbox, but hasn't input an email address in the text field, we let them know they need to add their email by rendering an error message
    const emailError =
      receiveNotifications && email === ''
        ? 'Enter an email to get review notifications.'
        : undefined;
    this.setState({emailNotifications: receiveNotifications, emailError});
  }

  @autobind
  handleEmailChange(value) {
    const {emailNotifications} = this.state;

    // We handle the error state of the email text field at the same time that we handle the field's onChange event, just in case the merchant removes their email but forgets to uncheck the email notification checkbox.
    const emailError =
      emailNotifications && value === ''
        ? 'Enter an email to get review notifications.'
        : false;
    this.setState({email: value, emailError});
  }

  @autobind
  handleFormSubmit() {
    const {updateSettingsMutation} = this.props;
    const {autoPublish, emailNotifications, email, emailError} = this.state;

    // We prevent form submission when there is an error in the email field.
    if (emailError) {
      return;
    }

    // Otherwise, we use GraphQL to update the merchant's app settings.
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
