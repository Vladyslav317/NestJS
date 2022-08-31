import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Tokens {
  @ApiProperty()
  @IsString()
  readonly access_token: string;

  @ApiProperty()
  @IsString()
  readonly refresh_token: string;
}
