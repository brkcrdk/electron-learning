import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Şifreyi hash'ler
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Şifreyi hash'lenmiş şifre ile karşılaştırır
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
