import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'movie without id & user' })
export class GetMovie {
  @Field()
  review: string;

  @Field()
  rating: number;

  @Field()
  tmdbId: number;
}
