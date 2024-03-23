import { ConfigProps } from 'src/interfaces/config.interface';

export const config = (): ConfigProps => ({
  security: { jwtSecrete: process.env.JWT_SECRETE },
});
