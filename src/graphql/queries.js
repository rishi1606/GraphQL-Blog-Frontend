import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($search: String, $tag: String) {
    getPosts(search: $search, tag: $tag) {
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

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    getPost(id: $id) {
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
