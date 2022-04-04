import { gql } from "@apollo/client";

export const CREATE_MOVIES = gql`
  mutation Create($data: CreateMovieDto!) {
    create(data: $data) {
      tmdbId
    }
  }
`;
