import { Injectable, Request, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { id: string; name: string; email: string }) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }

  /*async createRefreshToken(user: { id: string; name: string; email: string }) {
    const tokenFk = userId: user.id;
    
    await this.authTokenRepository.delete({
      ...tokenFk,
      type: TokenType.Refresh,
    });
    const timeInFuture = 1000 * 60 * 60 * 24 * 14;
    const refreshToken = crypto.randomBytes(32).toString('hex');
    await this.authTokenRepository.save({
      ...tokenFk,
      token: refreshToken,
      expires: new Date(new Date().getTime() + timeInFuture),
      type: TokenType.Refresh,
    });
    return refreshToken;
  }*/

  async register(user: UserDto) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashPassword;

    const { password, ...result } = await this.userService.create(user);
    return result;
  }
}
