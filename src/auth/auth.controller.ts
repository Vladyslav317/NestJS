import { Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  HttpCode,
  HttpStatus
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ProfileDto } from "./dto/profile.dto";
import { Tokens } from "./dto/tokens.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags('Tokens')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get access and refresh tokens' })
  @ApiResponse({
    status: 201,
    description: 'Get access and refresh Tokens',
    type: Tokens,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a profile' })
  @ApiResponse({
    status: 200,
    description: 'Get User',
    type: ProfileDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generated new access and refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Create a refresh token',
    type: Tokens
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBearerAuth('access-token')
  @Post('refresh')
  getRefreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout the user' })
  @ApiResponse({
    status: 200,
    description: 'Logout',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBearerAuth('access-token')
  @Delete('logout')
  removeToken(@Request() req) {
    return this.authService.removeToken(req.user);
  }
}
