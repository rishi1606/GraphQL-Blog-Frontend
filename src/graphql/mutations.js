import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $description: String!
    $content: String!
    $author: String
    $coverImage: String
    $tags: [String!]
  ) {
    createPost(
      title: $title
      description: $description
      content: $content
      author: $author
      coverImage: $coverImage
      tags: $tags
    ) {
      id
      title
      description
      content
      author
      coverImage
      tags
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
