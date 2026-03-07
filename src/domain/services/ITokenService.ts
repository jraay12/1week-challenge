export interface Payload {
  id: string;
}

export interface ITokenService {
  signAccessToken(payload: Payload): Promise<string>;
  verifyAccessToken<T = unknown>(token: string): Promise<T>;
  signRefreshToken(payload: Payload): Promise<string>;
  verifyRefreshToken<T = unknown>(token: string): Promise<T>;
}
