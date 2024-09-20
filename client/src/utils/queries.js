import { gql } from "@apollo/client";

export const ME = gql`
query Query($meId: ID, $username: String) {
  me(id: $meId, username: $username) {
    _id
    username
    email
    password
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
    bookCount
  }
}

`

