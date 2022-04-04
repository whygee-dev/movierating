import { gql } from "@apollo/client";

export const WHO_AMI = gql`
  query Query {
    whoAmI {
      email
      fullname
    }
  }
`;
