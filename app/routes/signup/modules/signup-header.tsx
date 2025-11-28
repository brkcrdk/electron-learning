import Icon from '../../../components/ui/icon';

function SignupHeader() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="bg-accent/20 rounded-full p-4">
        <Icon
          name="shield-check"
          className="text-accent size-8"
        />
      </div>
      <h1 className="card-title text-2xl">Hoş Geldiniz</h1>
      <p className="text-base-content/70 text-sm leading-relaxed">
        X Uygulamasına Hoş Geldiniz! Sistem yöneticisi hesabınızı oluşturarak başlayın. Bu hesap ile diğer kullanıcıları yönetebilir, admin rollerini
        belirleyebilir ve tüm sistem ayarlarını kontrol edebilirsiniz. Lütfen güvenli bir e-posta adresi ve şifre belirleyin.
      </p>
    </div>
  );
}

export default SignupHeader;
