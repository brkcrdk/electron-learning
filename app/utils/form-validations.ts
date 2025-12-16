export const usernameValidation = {
  required: 'Kullanıcı adı alanı zorunludur',
  minLength: {
    value: 3,
    message: 'Kullanıcı adı en az 3 karakter olmalıdır',
  },
  maxLength: {
    value: 20,
    message: 'Kullanıcı adı en fazla 20 karakter olabilir',
  },
  pattern: {
    value: /^[a-zA-Z0-9_-]+$/,
    message: 'Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir',
  },
};

export const passwordValidation = {
  required: 'Şifre alanı zorunludur',
  minLength: {
    value: 8,
    message: 'Şifre en az 8 karakter olmalıdır',
  },
};
