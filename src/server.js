import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa';
import {makeExecutableSchema} from 'graphql-tools';

/* eslint-disable babel/new-cap */
const app = new koa();
const router = new koaRouter();
/* eslint-enable babel/new-cap */
const PORT = 3001;

const typeDefs = `
  type Product {
    name: String
    averageRating: Float
    reviewCount: Int
  }

  type Customer {
    name: String
    email: String
  }

  type Review {
    id: Int!
    rating: Int
    title: String
    content: String
    customer: Customer
    product: Product
    status: String
    date: String
  }

  type Settings {
    autoPublish: Boolean
    emailNotifications: Boolean
    email: String
  }

  type Query {
    reviews: [Review]
    review(id: Int!): Review
    settings: Settings
  }

  type Mutation {
    updateSettings(autoPublish: Boolean, emailNotifications: Boolean, email: String): Settings
  }
`;

const reviews = [
  {
    id: 341,
    title: 'Seriously amazing!',
    content:
      "No joke, the best hair pomade I have ever used. My hair typically gets a little too wavy and unruly for the hairstyle I have been going with, but the Pomade Paste totally gave me control over my hair. The hold is amazing, plus it keeps a great 'dry-look' to my hair which I like. And lastly, the pomade smells bomb. Seriously it's the best thing you could do for your hair.",
    rating: 5,
    customer: {
      name: 'Mae Jemison',
      email: 'mae.jemison@gmail.com',
    },
    product: {
      name: 'Pomade Paste',
      averageRating: 4.4,
      reviewCount: 6,
    },
    status: 'published',
    date: 'Mar 18, 6: 21pm',
  },
  {
    id: 256,
    title: 'Very nice with a lovely smell',
    content:
      'The Pomade Cream smells nice and leaves the hair with a nice finish. I have also been using it on my beard and it is doing a great job of keeping it tamed! Strongly recommend the product (N1) and I am looking forward to see what other products Craigmont is going to create.',
    rating: 4,
    customer: {
      name: 'Ellen Ochoa',
      email: 'ellen.ochoa@gmail.com',
    },
    product: {
      name: 'Pomade Cream',
      averageRating: 3.6,
      reviewCount: 4,
    },
    status: 'unpublished',
    date: 'Mar 24, 12: 13pm',
  },
];

let settings = {
  autoPublish: false,
  emailNotifications: false,
  email: '',
};

const resolvers = {
  Query: {
    reviews: () => reviews,
    review(obj, args) {
      return reviews.find((review) => review.id === args.id);
    },
    settings: () => settings,
  },
  Mutation: {
    updateSettings: (root, args) => {
      settings = {
        autoPublish: args.autoPublish,
        emailNotifications: args.emailNotifications,
        email: args.email,
      };
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

router.post('/graphql', koaBody(), graphqlKoa({schema}));
router.get('/graphql', graphqlKoa({schema}));

router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
