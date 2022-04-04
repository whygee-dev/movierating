import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length, Matches } from 'class-validator';

@ObjectType({ description: 'user without id' })
export class CreateUser {
  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;
}
