import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {

  @ApiProperty({ example: 'user', description: 'User' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '43gf445r54', description: 'Password' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly password: string;
}
