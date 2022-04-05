import { Field, InputType } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class DeleteMovieDto {
  @Min(1)
  @Field()
  tmdbId: number;
}
