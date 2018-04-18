# Workshop

## Clone the example repo

`git clone git@github.com:Shopify/product-reviews-polaris-example.git`

## Step 1: Setting up your app

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

## Step 2: Reviews index

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

## Step 2: Review details

### Stack

### Custom rating component

## Step 3: Settings and forms

### Annotated layout

### Building a form

### Form submission

### Displaying errors

## Step 4: 404 page

```jsx
// NotFound.js

import React from 'react';

import {EmptyState, Page} from '@shopify/polaris';

export default function NotFound() {
  return (
    <Page>
      <EmptyState
        heading="The page you're looking for couldn't be found"
        action={{content: 'Back to index', url: '/'}}
        image="https://uploads.codesandbox.io/uploads/user/1235c92d-7d36-443f-81d7-db0974fe238d/WrcV-404.svg"
      >
        <p>Check the web address and try again.</p>
      </EmptyState>
    </Page>
  );
}
```
