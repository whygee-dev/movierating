import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: number;

  @Matches(
    /(^[A-Za-z]{2,16})([ ]{0,1})([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})/,
  )
  @Field()
  fullname: string;

  @IsEmail()
  @Field()
  email: string;

  @Length(8, 20, {
    message: 'Password length must be between 8 and 20 characters',
  })
  @Field({ nullable: true })
  password?: string;
}
