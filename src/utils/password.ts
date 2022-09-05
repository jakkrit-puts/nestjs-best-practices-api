import { hash, compare } from 'bcrypt';
import * as config from 'config';
const jwtConfig = config.get('jwt');

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, jwtConfig.get('salt'));
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
