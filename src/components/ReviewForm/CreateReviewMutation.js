import {gql} from 'apollo-boost';

const CreateReview = gql`
  mutation CreateReview(
    $name: String!
    $product: String!
    $rating: Int!
  ) {
    createReview (
      name: $name
      product: $product
      rating: $rating
    ) {
      id
    }
  }
`;

export default CreateReview;
