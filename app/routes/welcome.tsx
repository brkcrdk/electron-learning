import { createFileRoute } from '@tanstack/react-router';
import { HiShieldCheck } from 'react-icons/hi2';

import PasswordInput from '../components/ui/password-input';

export const Route = createFileRoute('/welcome')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="bg-base-200 flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body space-y-6">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-accent/20 rounded-full p-4">
              <HiShieldCheck className="text-accent size-8" />
            </div>
            <h1 className="card-title text-2xl">Hoş Geldiniz</h1>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Bu uygulamanın ilk kullanımı. Sistem yöneticisi hesabınızı oluşturarak başlayın. Bu hesap ile diğer kullanıcıları yönetebilir, admin rollerini
              belirleyebilir ve tüm sistem ayarlarını kontrol edebilirsiniz. Lütfen güvenli bir e-posta adresi ve şifre belirleyin.
            </p>
          </div>

          {/* Form Section */}
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                className="label"
                htmlFor="email"
              >
                <span className="label-text font-medium">E-posta</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="example@example.com"
                required
                id="email"
              />
            </div>

            <div className="space-y-2">
              <label
                className="label"
                htmlFor="password"
              >
                <span className="label-text font-medium">Şifre</span>
              </label>
              <PasswordInput inputProps={{ placeholder: '********', required: true, id: 'password' }} />
            </div>

            <button
              type="submit"
              className="btn btn-block mt-6"
            >
              Super Admin Oluştur
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
