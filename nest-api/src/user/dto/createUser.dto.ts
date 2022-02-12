import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field() fullname: string;
  @Field() email: string;
  @Field() password: string;
}
