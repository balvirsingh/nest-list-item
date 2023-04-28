import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      signOptions: { expiresIn: '9000s' },
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  //exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
