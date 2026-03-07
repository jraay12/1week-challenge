export interface IPasswordHasher {
  hash(password: string): Promise<void>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
