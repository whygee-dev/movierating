import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length, Matches } from 'class-validator';

@InputType()
export class CreateUserDto {
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
  @Field()
  password: string;
}
