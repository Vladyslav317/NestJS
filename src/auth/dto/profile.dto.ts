import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ProfileDto {
  @ApiProperty({ example: 'user', description: 'User' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Mailbox' })
  @IsString()
  @IsEmail()
   email: string;
}
