import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateListDto {
  @ApiProperty({ description: 'The name of a list.' })
  @IsString()
  readonly name: string;
}
