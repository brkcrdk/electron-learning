export const emailValidation = {
  required: 'E-posta alanı zorunludur',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Geçerli bir e-posta adresi giriniz',
  },
};
