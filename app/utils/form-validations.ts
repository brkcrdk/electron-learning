export const emailValidation = {
  required: 'E-posta alanı zorunludur',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Geçerli bir e-posta adresi giriniz',
  },
};

export const passwordValidation = {
  required: 'Şifre alanı zorunludur',
  minLength: {
    value: 8,
    message: 'Şifre en az 8 karakter olmalıdır',
  },
};
