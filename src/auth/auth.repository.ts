import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/user-payload';
import { jwtConstants } from './constants';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './interfaces/token-payload';

@Injectable()
export class AuthRepository {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserPayload> {
    try {
      const user = await this.UsersService.findByUsername(username);

      if (user && await compare(pass, user.password)) {
        return user;
      }

      return null;
    } catch(err) {
      console.error(err);
    }
  }

  async login(user: UserPayload): Promise<Token> {
    try {
      const userFoundByEmail = await this.UsersService.findByUsername(user.name);

      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(
          {
            username: user.name,
            email: user.email,
          },
          {
            secret: jwtConstants.ACCESS_SECRET,
            expiresIn: '30s',
          },
        ),
        this.jwtService.signAsync(
          {
            username: user.name,
            email: user.email,
          },
          {
            secret: jwtConstants.REFRESH_SECRET,
            expiresIn: '60s',
          },
        ),
      ]);

      this.authModel.insertMany({
        username: userFoundByEmail.name,
        email: userFoundByEmail.email,
        password: userFoundByEmail.password,
        isAdmin: userFoundByEmail.isAdmin,
        refreshToken: rt,
      });

      return {
        access_token: at,
        refresh_token: rt,
      };
    } catch(err) {
      console.error(err);
    }
  }

  async refreshTokens(user: UserPayload): Promise<Token> {
    try {
      const authUser = await this.authModel.findOne({ email: user.email }).exec();

      if (!authUser) {
        throw new ForbiddenException('Access Denied');
      }

      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(
          {
            username: user.name,
            email: user.email,
          },
          {
            secret: jwtConstants.ACCESS_SECRET,
            expiresIn: '30s',
          },
        ),
        this.jwtService.signAsync(
          {
            username: authUser.name,
            email: authUser.email,
          },
          {
            secret: jwtConstants.REFRESH_SECRET,
            expiresIn: '60s',
          },
        ),
      ]);

      return {
        access_token: at,
        refresh_token: rt,
      };
    } catch(err) {
      console.error(err);
    }
  }

  async removeToken(user: UserPayload): Promise<object> {
    try {
      await this.authModel.updateOne({ name: user.name }, { refreshToken: '' });

      return {
        msg: 'You logged out'
      }
    } catch(err) {
      console.error(err);
    }
  }
}
