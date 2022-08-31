import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @ApiProperty({ example: 'user', description: 'User' })
  @Prop()
  name: string

  @ApiProperty({ example: 'user@gmail.com', description: 'Mailbox' })
  @Prop()
  email: string

  @ApiProperty({ example: '43gf445r54', description: 'Password' })
  @Prop()
  password: string

  @ApiProperty({ example: 'true or false', description: 'Admin or User' })
  @Prop()
  isAdmin: boolean

  @ApiProperty({ example: 'refreshToken', description: 'Token' })
  @Prop()
  refreshToken: string
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
