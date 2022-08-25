import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AtStrategy } from './at.strategy';
import { RtStrategy } from './rt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule,
    CaslModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema}]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AtStrategy,
    RtStrategy,
    AuthRepository,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
