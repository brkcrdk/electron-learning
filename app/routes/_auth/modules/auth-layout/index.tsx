import Header from './header';

import type { PropsWithChildren } from 'react';

export type AuthLayoutMode = 'signup' | 'login';

interface Props extends PropsWithChildren {
  actionMode: AuthLayoutMode;
}

const actionModeTitles = {
  signup: {
    title: 'Hoş Geldiniz',
    description:
      'X Uygulamasına Hoş Geldiniz! Sistem yöneticisi hesabınızı oluşturarak başlayın. Bu hesap ile diğer kullanıcıları yönetebilir, admin rollerini belirleyebilir ve tüm sistem ayarlarını kontrol edebilirsiniz. Lütfen güvenli bir e-posta adresi ve şifre belirleyin.',
  },
  login: {
    title: 'Giriş Yap',
    description: 'Lütfen giriş yapmak için e-posta adresinizi ve şifrenizi giriniz.',
  },
};

function AuthLayout({ actionMode, children }: Props) {
  return (
    <>
      <div className="webkit-draggable h-8 w-full" />
      <section className="bg-base-200 flex h-screen w-screen flex-col items-center justify-center p-4">
        <div className="card bg-base-100 w-full max-w-lg shadow-xl">
          <div className="card-body space-y-6">
            <Header
              title={actionModeTitles[actionMode].title}
              description={actionModeTitles[actionMode].description}
            />
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthLayout;
