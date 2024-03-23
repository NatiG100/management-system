export interface SecurityConfigProps {
  jwtSecrete: string;
}
export interface ServerConfigProps {
  port: number;
}
export interface ConfigProps {
  security: SecurityConfigProps;
  server: ServerConfigProps;
}
