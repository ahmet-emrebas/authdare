import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@resources';
import { compare } from 'bcrypt';
import { AuthLoginDto } from './auth-login.dto';
import { SignupDto } from './signup.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  private async signToken(payload: any) {
    return await this.jwt.sign(payload);
  }

  async login(loginDto: AuthLoginDto) {
    const foundUsers = await this.userService.find({ email: loginDto.email });

    if (foundUsers && foundUsers[0]) {
      try {
        const isPasswordMatch = await compare(
          loginDto.password,
          foundUsers[0].password,
        );

        if (isPasswordMatch === true) {
          const authToken = await this.signToken({ ...foundUsers[0] });
          return authToken;
        }
        throw new UnauthorizedException('Wrong password');
      } catch (err) {
        Logger.error(err);
        throw new UnauthorizedException('Wrong password');
      }
    }
    throw new UnauthorizedException('Either email or password is wrong!');
  }

  async signup(user: SignupDto) {
    try {
      const createdUser = await this.userService.save({
        ...user,
        permissions: ['all'],
      });

      const token = await this.signToken({ ...createdUser });

      return token;
    } catch (err) {
      Logger.error(err);
      throw new UnprocessableEntityException(err);
    }
  }

  async unsubscribe(id: number) {
    this.userService.delete(id);
  }

  async verifyEmail(id: number) {
    return await this.userService.update(id, { emailVerified: true });
  }
}
