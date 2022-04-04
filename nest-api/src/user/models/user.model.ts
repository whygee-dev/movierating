import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length, Matches } from 'class-validator';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;
}
