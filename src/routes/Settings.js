import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {autobind} from '@shopify/javascript-utilities/decorators';

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
      return <div>Loading...</div>;
    }

    return <div>Settings content.</div>;
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
