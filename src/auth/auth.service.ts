import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Message } from 'src/types/apiFeatures';
import { UsersService } from 'src/users/users.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private util: UtilService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    email: string,
    pass: string,
  ): Promise<Message<{ access_token: string; user: Partial<User> }>> {
    const user = await this.userService.findByEmail(email);
    const authenticUser = this.util.check(pass, user.data.hash, user.data.salt);
    if (!authenticUser) {
      throw new UnauthorizedException();
    }
    const { hash, salt, ...result } = user.data;
    const payload = { sub: user.data.id, email: user.data.email };
    return {
      data: {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      },
      message: 'Successfully authenticated',
    };
  }
}
