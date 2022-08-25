import { Controller, Post, UseGuards, Request, Get, ForbiddenException, Delete} from "@nestjs/common";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { Action } from "src/users/entities/action.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const ability = this.caslAbilityFactory.createForUser(req.user);

    const isAllowed = ability.can(Action.Create, UserEntity);

    if (!isAllowed) {
      throw new ForbiddenException('should be admin');
    }

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  getRefreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  removeToken(@Request() req) {
    return this.authService.removeToken(req.user);
  }
}
