import { gql } from "@apollo/client";

export const UPDATE_MOVIE = gql`
  mutation Update($data: CreateMovieDto!) {
    update(data: $data) {
      tmdbId
    }
  }
`;
