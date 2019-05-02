import {gql} from 'apollo-boost';

const CreateReview = gql`
  mutation CreateReview(
    $name: String!
    $product: String!
    $title: String!
    $content: String!
    $rating: Int!
  ) {
    createReview (
      name: $name
      product: $product
      title: $title
      content: $content
      rating: $rating
    ) {
      id
    }
  }
`;

export default CreateReview;
