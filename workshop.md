# Polaris Workshop

## Introduction to Polaris and the Style Guide (5 min) - Dom

### What is Polaris?

* Shopify’s design system, provides a common framework with which to build high quality experiences for merchants and partners
* Consists of UI design and development kits, design and content guidelines and more

### How should you use it?

* Style guide
* Guidelines
* Component reference
* What’s new
* Examples

### Workshop overview

Together we will be building out a product review app to manage the customer submitted reviews on our products.

#### Goals

Give attendees a high level view of what Polaris (both the components and our documentation) can give them and an overview of the process of building an app using those tools.

#### Structure

* Introduction
* Building the product review app using Polaris React
* Q & A

At the end of this workshop you will have built something that looks like this.

![Index page screenshot](public/images/index-screenshot.png)

![Show page screenshot](public/images/show-screenshot.png)

![Settings page screenshot](public/images/settings-screenshot.png)

## Step 1: Setting up your app (Dom 15 minutes)

`git clone git@github.com:Shopify/product-reviews-polaris-example.git`

First we need to install the Polaris React package from npm.

`npm install --save @shopify/polaris`

We then need to setup our main app to use Polaris.

In `App.js` add the following code:

```jsx
// App.js
import React, {Component} from 'react';
import {AppProvider} from '@shopify/polaris';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <p>Hello world</p>
      </AppProvider>
    );
  }
}
```

Looking at the structure of our app we are going to be building we will be making use of the index and details structure. The index will act as the listing of reviews. Its aim will be to find the review we want to look at and navigate to see more details about the review.

The show page is where the details about the review will be listed.

## Step 2: Reviews index (Chloe 15 minutes)

Let's start by setting up our index page. Go ahead and open up `src/routes/ReviewList.js`. You will notice we already have a GraphQL query setup to fetch the list of reviews.

Let's start building out the UI of this page using Polaris.

### Page

The page component should wrap each page in your app in. It accepts a title prop that you can use to give the page a title.

```jsx
<Page title="Product reviews" />
```

### Card

We will then add a Card component inside our Page. Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and get things done.

```jsx
<Page title="Product reviews">
  <Card />
</Page>
```

When building a new view for your application you should always consider all the different states for your data. Loading, empty, some and lots.

### Loading state

We will start with the loading state. This is what will be shown as the network request is running to fetch the data for our view through GraphQL. Polaris comes with a set of skeleton content components that can be used to signify to the user that data is currently being fetched.

Import the components you need from Polaris and put them inside our Card component we added.

```jsx
<Page title="Product reviews">
  <Card sectioned>
    <TextContainer>
      <SkeletonDisplayText size="small" />
      <SkeletonBodyText />
    </TextContainer>
  </Card>
</Page>
```

You will now see the skeleton content animate on the screen to show it is loading.

We are going to use the `loading` prop that is passed into our component to trigger whether we should show the skeleton content.

```jsx
if (loading) {
  return (
    <Page
      title="Product reviews"
      secondaryActions={[
        {icon: settings, content: 'Settings', url: '/settings'},
      ]}
    >
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    </Page>
  );
}
```

### Empty state

Next, we will build out our empty state. This is what will be displayed when there are no reviews saved yet. For this we will use the Polaris `EmptyState` component.

```jsx
<EmptyState
  heading="You haven't received any reviews yet"
  action={{content: 'Configure settings'}}
  secondaryAction={{
    content: 'Learn more',
    url: 'https://help.shopify.com',
  }}
  image="/review-empty-state.svg"
>
  <p>Once you have received reviews they will display on this page.</p>
</EmptyState>
```

### Resource list

Now that we have our loading and empty states covered we will now build out the list of reviews. For this we are going to use the `ResourceList` component from Polaris. The Resource List displays a collection of objects to allow a user to find the one they want and navigate to see more details about it. Because every type of resource is different and requires different information to be shown, we allow you to customize the display of each item in the list by using a custom ResourceListItem. For this example we have already created a new component called `ReviewListItem` that you can use.

First we will import our custom component.

```jsx
import ReviewListItem from '../components/ReviewListItem';
```

And then we will create our new Resource List using that custom item.

```jsx
<ResourceList
  showHeader
  resourceName={{singular: 'review', plural: 'reviews'}}
  items={reviews}
  renderItem={(review) => <ReviewListItem {...review} />}
/>
```

Hooking it all together we are going to use the length of the `reviews` array we receive from the GraphQL query to decide whether to show the empty state or the resource list.

```jsx
const pageContent =
  reviews.length === 0 ? (
    <EmptyState
      heading="You haven't received any reviews yet"
      action={{content: 'Configure settings'}}
      secondaryAction={{
        content: 'Learn more',
        url: 'https://help.shopify.com',
      }}
      image="/review-empty-state.svg"
    >
      <p>Once you have received reviews they will display on this page.</p>
    </EmptyState>
  ) : (
    <Card>
      <ResourceList
        showHeader
        resourceName={{singular: 'review', plural: 'reviews'}}
        items={reviews}
        renderItem={(review) => <ReviewListItem {...review} />}
      />
    </Card>
  );

return <Page title="Product reviews">{pageContent}</Page>;
```

## Step 2: Review details (Dom 15 minutes)

Now that we have our index page working, we will move onto the page to display the details for each review.

### Layout

Looking at our mockup or this page we will notice it should display in two columns on larger screens. We will use the `Layout` component from Polaris to do this.

Inside the Page component that is there already add our layout.

```jsx
<Page title={review.title} breadcrumbs={[{content: 'All reviews', url: '/'}]}>
  <Layout />
</Page>
```

Inside that new layout we will add two sections. We add the `secondary` prop on the second one to signify that it should be the smaller of the two columns.

```jsx
<Layout>
  <Layout.Section />
  <Layout.Section secondary />
</Layout>
```

Inside those sections we will add a card to each which is where we will add our content for the page.

```jsx
<Layout>
  <Layout.Section>
    <Card title="Review" sectioned />
  </Layout.Section>
  <Layout.Section secondary>
    <Card sectioned />
  </Layout.Section>
</Layout>
```

### Stack

So where the `Layout` component works really well for that overall page layout, the `Stack` component is designed for laying out the micro layouts within the page.

Stacks can be used to align and space elements in a way that will wrap responsively based on the content size and the space available.

We are going to use two stacks, one nested inside the other to create the following layout.

![Diagram of stack item boundaries](public/images/stack-xray.png)

We will start with the vertical stack.

```jsx
<Card title="Review" sectioned>
  <Stack vertical />
</Card>
```

Placing elements inside of this `Stack` will lay them out vertically with consistent spacing. Let's output the rating and content from the review to see how it works.

```jsx
<Card title="Review" sectioned>
  <Stack vertical>
    <Rating value={review.rating} />
    <p>{review.content}</p>
  </Stack>
</Card>
```

We can then use a nested Stack to get the `Avatar` and customer name side by side within it. We are also going to use the alignment prop to centre the elements vertically.

```jsx
<Card title="Review" sectioned>
  <Stack vertical>
    <Stack alignment="center">
      <Avatar customer name={review.customer.name} />
      <p>{review.customer.name}</p>
    </Stack>
    <Rating value={review.rating} />
    <p>{review.content}</p>
  </Stack>
</Card>
```

### Badge

Next we want to add something to tell the merchant whether the review is published or not. We will use the `Badge` component for this. Badges are used to inform merchants about the status of something.

We will want the color and content of this badge to reflect the status of the review. To do that we will use a ternary operator to switch between the two variations based on status.

```jsx
const badge =
  review.status === 'published' ? (
    <Badge status="success">Published</Badge>
  ) : (
    <Badge status="attention">Unpublished</Badge>
  );
```

We will then output the result of that badge into our stack.

```jsx
<Stack alignment="center">
  <Avatar customer name={review.customer.name} />
  <p>{review.customer.name}</p>
  {badge}
</Stack>
```

## Step 3: Settings and forms (Chloe 15 minutes)

Now that we have the index and show pages done for our reviews, we will move onto the settings page.

### Annotated layout

Much like we used the `Layout` component on the show page, we will also use it here. Only this time we will be using the `Layout.AnnotatedSection` sub-component. An annotated section is used to give a title and description to a section of content. This is useful in settings pages where you need to give more context about what the merchant is changing.

Open up `src/routes/Settings.js` and put the following inside the `Page` component.

```jsx
<Layout>
  <Layout.AnnotatedSection
    title="Auto publish"
    description="Automatically check new reviews for spam and then publish them."
  >
    <Card sectioned />
  </Layout.AnnotatedSection>
  <Layout.AnnotatedSection
    title="Email settings"
    description="Choose if you want to receive email notifications for each review."
  >
    <Card sectioned />
  </Layout.AnnotatedSection>
</Layout>
```

### Building a form

Our settings page is really going to act as one large form where we will take input from the merchant about their settings and save it.

First we will need to wrap our page in the `Form` component from Polaris. This will be used to handle the submission. Since there is already a form submission handler function written for us, we just need to hook them up.

```jsx
<Form onSubmit={this.handleFormSubmit}>
  <Page
    title="Settings"
    breadcrumbs={[{content: 'Product reviews', url: '/'}]}
  />
</Form>
```

### Choice list

The first thing we need to add to the form is a way for the merchant to enable and disable auto publishing reviews that are submitted. To do that we are going to use the `ChoiceList` component. This component displays a list of checkboxes or radio buttons to get a choice from the merchant.

```jsx
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
      helpText: 'You must manually approve and publish new reviews.',
    },
  ]}
  selected={autoPublishSelected}
  onChange={this.handleAutoPublishChange}
/>
```

### Displaying errors

Next we need the fields for whether the merchant wants to be notified by email when new reviews are submitted. For this we will need both a `Checkbox` and `TextField` component.

We will use another stack to get the correct spacing between them.

```jsx
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
```

Now we want to show an error if the merchant selects they want to receive email notifications but hasn't yet put in an email address.

```jsx
@autobind
handleEmailNotificationChange(value) {
  const {email} = this.state;
  const emailError =
    value && email === ''
      ? 'Enter an email to get review notifications.'
      : undefined;
  this.setState({emailNotifications: value, emailError});
}
```

### Form submission

Finally, we need to add a submit button to be able to actually submit the form. For this we will use the `PageActions` component. We will add a new `Layout.Section` below our annotated sections and put the page actions within it.

```jsx
<Layout.Section>
  <PageActions
    primaryAction={{
      content: 'Save',
      submit: true,
    }}
  />
</Layout.Section>
```

And that's it. We now have a great start on our app. Feel free to continue exploring the rest of the code there, try out some new components, or even build some of your own.

## Closing thoughts / QA (Dom 10 minutes)
