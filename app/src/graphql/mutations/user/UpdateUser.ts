import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserDto!) {
    updateUser(data: $data) {
      fullname
      email
    }
  }
`;
