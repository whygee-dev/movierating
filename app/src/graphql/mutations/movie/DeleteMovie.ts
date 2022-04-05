import { gql } from "@apollo/client";

export const DELETE_MOVIE = gql`
  mutation Delete($data: DeleteMovieDto!) {
    delete(data: $data) {
      tmdbId
    }
  }
`;
