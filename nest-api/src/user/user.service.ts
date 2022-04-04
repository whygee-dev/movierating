import { Injectable } from '@nestjs/common';
import { Movie, Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = data;
    user.password = await bcrypt.hash(data.password, 11);

    try {
      const result = await this.prisma.user.create({
        data: user,
      });

      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('An account with this email already exists.');
        }
      }
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const user = data;
    user.password = await bcrypt.hash(data.password as string, 11);

    return this.prisma.user.update({
      data: user,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getMovies(userId: number): Promise<{ movies: Movie[] }> {
    const movies = await this.prisma.movie.findMany({ where: { userId } });

    return { movies };
  }
}