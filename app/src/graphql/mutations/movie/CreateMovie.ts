import { gql } from "@apollo/client";

export const CREATE_MOVIE = gql`
  mutation Create($data: CreateMovieDto!) {
    create(data: $data) {
      tmdbId
    }
  }
`;
