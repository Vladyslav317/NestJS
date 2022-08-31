import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ type: String })
  _id: ObjectId

  @ApiProperty({ example: 'user', description: 'User'})
  @Prop()
  name: string

  @ApiProperty({ example: 'user@gmail.com', description: 'Mailbox' })
  @Prop()
  email: string

  @ApiProperty({ example: '43gf445r54', description: 'Password' })
  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);
