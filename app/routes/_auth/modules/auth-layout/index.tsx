import type { PropsWithChildren } from 'react';

import Card from '@app/components/ui/card';

import Header from './header';

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

function AuthLayout({ children, actionMode }: Props) {
  return (
    <>
      <div className="webkit-draggable h-8 w-full" />
      <section className="flex min-h-svh w-full items-center justify-center p-6">
        <div className="flex flex-col gap-6">
          <Card className="min-w-100">
            <Card.Header>
              <Card.Title>{actionModeTitles[actionMode].title}</Card.Title>
              <Card.Description>{actionModeTitles[actionMode].description}</Card.Description>
            </Card.Header>
            <Card.Content>{children}</Card.Content>
          </Card>
        </div>
      </section>
    </>
  );
}

export default AuthLayout;
