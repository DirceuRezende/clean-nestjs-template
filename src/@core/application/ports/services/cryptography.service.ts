export interface CryptographyService {
  hashPassword(password: string, salt: string): Promise<string>;
}
