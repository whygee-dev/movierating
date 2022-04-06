import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Movie } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createMovie(
    data: Omit<
      Prisma.MovieCreateInput,
      'user' | 'title' | 'posterPath' | 'backdropPath'
    >,
    userId: number,
  ): Promise<Movie> {
    try {
      const tmdbMovie = (
        await axios.get(
          'https://api.themoviedb.org/3/movie/' +
            data.tmdbId +
            '?api_key=' +
            this.configService.get('TMDB_KEY'),
        )
      ).data;

      if (!tmdbMovie || tmdbMovie.success === 'false') {
        throw Error('Invalid tmdb id');
      }

      const existing = await this.prisma.movie.findFirst({
        where: { userId, tmdbId: data.tmdbId },
      });

      if (existing) {
        throw Error("Movie already exist in user's list");
      }

      console.log(userId);

      return this.prisma.movie.create({
        data: {
          ...data,
          title: tmdbMovie.original_title,
          posterPath: tmdbMovie.poster_path,
          backdropPath: tmdbMovie.backdrop_path,
          user: { connect: { id: userId } },
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async updateMovie(
    data: Omit<
      Prisma.MovieCreateInput,
      'user' | 'title' | 'posterPath' | 'backdropPath'
    >,
    userId: number,
  ): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.findFirst({
        where: { userId, tmdbId: data.tmdbId },
      });

      if (!movie) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      return this.prisma.movie.update({
        where: { id: movie.id },
        data: { rating: data.rating, review: data.review },
      });
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async deleteMovie(tmdbId: number, userId: number): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.findFirst({
        where: { userId, tmdbId },
      });

      if (!movie) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      return this.prisma.movie.delete({
        where: { id: movie.id },
      });
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
