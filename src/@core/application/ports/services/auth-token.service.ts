import { User } from '@/@core/domain/entities';

export interface AuthTokenService {
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(): Promise<string>;
  getUserIdFromToken(token: string): Promise<string>;
  isTokenValid(
    accessToken: string,
    validateLifeTime: boolean,
  ): Promise<boolean>;
}
