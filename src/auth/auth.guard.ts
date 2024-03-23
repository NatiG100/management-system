import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfigProps } from 'src/interfaces/config.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private JwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.JwtService.verifyAsync(token, {
        secret:
          this.configService.get<SecurityConfigProps>('security').jwtSecrete,
      });
      const user = await this.userService.findOne(request['user'].sub);
      if (!user.data || user.data.status !== 'ACTIVE') {
        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      request.headers.get('authorization')?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
