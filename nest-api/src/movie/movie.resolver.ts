import { Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { CurrentUser } from 'src/graphql/current-user.decorator';
import { GetUser } from 'src/user/models/get-user.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { GetMovie } from './models/get-movie.model';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation((returns) => GetMovie)
  @UseGuards(GqlAuthGuard)
  create(@CurrentUser() user: GetUser, @Args('data') data: CreateMovieDto) {
    return this.movieService.createMovie(data, user.id);
  }

  @Mutation((returns) => GetMovie)
  @UseGuards(GqlAuthGuard)
  update(@CurrentUser() user: GetUser, @Args('data') data: CreateMovieDto) {
    return this.movieService.updateMovie(data, user.id);
  }

  @Mutation((returns) => GetMovie)
  @UseGuards(GqlAuthGuard)
  delete(@CurrentUser() user: GetUser, @Args('data') data: DeleteMovieDto) {
    return this.movieService.deleteMovie(data.tmdbId, user.id);
  }
}
