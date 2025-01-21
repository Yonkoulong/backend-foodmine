import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload, Public, Tokens } from '@foodmine-be/common';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@Req() req: Request): Promise<Tokens> {
    const user = req.user as JwtPayload & { refreshToken: string };
    return this.authService.refreshToken(user?.sub, user?.refreshToken);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  @UseGuards(AuthGuard('jwt-at'))
  logout(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.authService.logout(user.sub);
  }
}
