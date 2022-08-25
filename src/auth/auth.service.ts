import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { Token } from "./interfaces/token-payload";
import { UserPayload } from "./interfaces/user-payload";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async validateUser(username: string, pass: string): Promise<UserPayload> {
    return this.authRepository.validateUser(username, pass);
  }

  async login(user: UserPayload): Promise<Token> {
    return this.authRepository.login(user);
  }

  async refreshTokens(user: UserPayload): Promise<Token> {
    return this.authRepository.refreshTokens(user);
  }

  async removeToken(user: UserPayload): Promise<object> {
    return this.authRepository.removeToken(user);
  }
}
