import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
    mutation Mutation($username: String, $email: String, $password: String!) {
  login(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}

`
export const CREATE_USER = gql`
    mutation Mutation($username: String!, $email: String, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}
`
export const SAVE_BOOK = gql`
    mutation Mutation($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String, $link: String) {
  saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    _id
    username
    email
    password
    bookCount
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}

`
export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: String) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    password
    bookCount
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}

`
