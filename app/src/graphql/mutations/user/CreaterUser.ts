import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($data: CreateUserDto!) {
    createUser(data: $data) {
      fullname
      email
      password
    }
  }
`;
