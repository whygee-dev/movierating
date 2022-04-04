import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user without password' })
export class GetUser {
  @Field()
  id: number;

  @Field()
  fullname: string;

  @Field()
  email: string;
}
