import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Movie } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async createMovie(
    data: Omit<
      Prisma.MovieCreateInput,
      'user' | 'title' | 'posterPath' | 'backdropPath'
    >,
    userEmail: string,
  ): Promise<Movie> {
    try {
      const tmdbMovie = (
        await axios.get(
          'https://api.themoviedb.org/3/movie/' +
            data.tmdbId +
            '?api_key=' +
            process.env.TMDB_KEY,
        )
      ).data;

      if (!tmdbMovie || tmdbMovie.success === 'false') {
        throw Error('Invalid tmdb id');
      }

      return this.prisma.movie.create({
        data: {
          ...data,
          title: tmdbMovie.original_title,
          posterPath: tmdbMovie.poster_path,
          backdropPath: tmdbMovie.backdrop_path,
          user: { connect: { email: userEmail } },
        },
      });
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
