import { Field, InputType } from '@nestjs/graphql';
import { Length, Max, Min } from 'class-validator';

@InputType()
export class CreateMovieDto {
  @Length(10, 250)
  @Field()
  review: string;

  @Min(0)
  @Max(10)
  @Field()
  rating: number;

  @Min(1)
  @Field()
  tmdbId: number;
}
