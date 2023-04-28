import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('auth')
@ApiTags('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserDto) {
    return await this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginUserDto, @Request() request) {
    return await this.authService.login(request.user);
    /*const refreshToken = await this.authService.createRefreshToken(
      request.user,
    );
    const timeInFuture = 1000 * 60 * 60 * 24 * 14;
    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      maxAge: timeInFuture,
    });*/

    //return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
