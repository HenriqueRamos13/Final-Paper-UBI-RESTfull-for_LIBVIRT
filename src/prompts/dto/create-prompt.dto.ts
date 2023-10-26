import { ApiProperty } from '@nestjs/swagger';

export class CreatePromptDto {
  @ApiProperty()
  command: string;
}
