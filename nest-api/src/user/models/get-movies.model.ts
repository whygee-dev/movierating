import { Field, ObjectType } from '@nestjs/graphql';
import { GetMovie } from 'src/movie/models/get-movie.model';

type Movie = {
  rating: number;
  review: string;
  tmdbId: number;
};

@ObjectType({ description: 'user movies' })
export class GetMovies {
  @Field(() => [GetMovie])
  movies: GetMovie[];
}
