import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from 'src/types/apiFeatures';
import { UsersService } from 'src/users/users.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private util: UtilService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async signIn(
    email: string,
    pass: string,
  ): Promise<Message<{ access_token: string; user: Partial<User> }>> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const authenticUser = this.util.check(pass, user.hash, user.salt);
    if (!authenticUser) {
      throw new UnauthorizedException();
    }
    const { hash, salt, ...result } = user;
    const payload = { sub: user.id, email: user.email };
    return {
      data: {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      },
      message: 'Successfully authenticated',
    };
  }
  async me(userId: string): Promise<Message<Partial<User>>> {
    const user = await this.userService.findOne(userId);
    if (!user || user.data.status !== 'ACTIVE') {
      throw new UnauthorizedException(
        'Your account is inactive, please contact the admin.',
      );
    }
    return user;
  }
}
