import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query Query {
    getMovies {
      movies {
        review
        rating
        title
        posterPath
        backdropPath
        tmdbId
      }
    }
  }
`;
