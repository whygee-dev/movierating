import { Field, ObjectType } from '@nestjs/graphql';
import { GetMovie } from 'src/movie/models/get-movie.model';

@ObjectType({ description: 'user movies' })
export class GetMovies {
  @Field(() => [GetMovie])
  movies: GetMovie[];
}
