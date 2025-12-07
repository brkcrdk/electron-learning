import { type User } from '../db/schema';

/**
 * Sadece uygulama açıkken saklanılması gereken bir oturum olduğu için `store` ile saklamak
 * yerine ramde bir değişkende saklıyoruz. Böylece uygulama kapanınca otomatik logout olunmuş oluyor.
 * Ayrıca bir logout aksiyonu da renderer tarafında yönetiliyor.
 */
let currentUser: User | null = null;

export function setCurrentUser(user: User) {
  currentUser = user;
}

export function getCurrentUser() {
  if (currentUser === null) {
    throw new Error('Giriş yapmış kullanıcı bulunamadı.');
  } else {
    return currentUser;
  }
}

export function clearCurrentUser() {
  currentUser = null;
}
