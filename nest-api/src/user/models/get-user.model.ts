import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches } from 'class-validator';

@ObjectType({ description: 'user without id & password' })
export class GetUser {
  @Matches(
    /(^[A-Za-z]{2,16})([ ]{0,1})([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})/,
  )
  @Field()
  fullname: string;

  @IsEmail()
  @Field()
  email: string;
}
