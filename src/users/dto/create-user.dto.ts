import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'User' })
  name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Mailbox' })
  email: string;

  @ApiProperty({ example: '43gf445r54', description: 'Password' })
  password: string;
}
