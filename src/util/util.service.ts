import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class UtilService {
  hash(password: string): { hash: string; salt: string } {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return { salt, hash };
  }
  check(password: string, hash: string, salt: string): boolean {
    const checkHash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(
      `hex`,
    );
    return checkHash === hash;
  }
}
