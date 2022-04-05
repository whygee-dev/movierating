import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { CurrentUser } from 'src/graphql/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUser } from './models/create-user.model';
import { GetMovies } from './models/get-movies.model';
import { GetUser } from './models/get-user.model';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => GetUser)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: GetUser) {
    return this.userService.user({ email: user.email });
  }

  @Mutation((returns) => CreateUser)
  createUser(@Args('data') data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Mutation((returns) => GetUser)
  @UseGuards(GqlAuthGuard)
  updateUser(@CurrentUser() user: GetUser, @Args('data') data: UpdateUserDto) {
    return this.userService.updateUser({ where: { id: user.id }, data });
  }

  @Query((returns) => GetMovies)
  @UseGuards(GqlAuthGuard)
  getMovies(@CurrentUser() user: GetUser) {
    return this.userService.getMovies(user.id);
  }
}
