import Icon from '../icon';

const errorMessages: Record<string, string> = {
  title: 'Dosya yüklemeye çalışırken bir hata oluştu!',
  invalidType: 'Geçersiz dosya tipi. Lütfen geçerli bir dosya deneyiniz.',
  uploadLimit: 'Birden fazla dosya sürüklendi. Lütfen sadece bir tane dosya ile deneyiniz.',
  connectionError: 'Dosya yüklenmesi sırasında bağlantı sorunu oluştu. Lütfen tekrar deneyiniz.',
  sizeLimit: 'Boyut aşımı hatası oluştu.',
  sizeLimitDescription: 'Yüklemek istediğiniz dosya {size}tan büyük olmamalıdır.',
};

/**
 * Bazı yerlerde dosya boyutunu KB cinsinden kabul edebiliyoruz altında bekliyoruz.
 * Bu durumda da size değeri ondalıklı olarak geliyor. Bunu da text içinde render ederken `0.5 MB` şeklinde
 * göstermek yerine 500KB şeklinde göstermek için bu şekilde bir function kullanıyoruz.
 *
 * @example
 * humanizeSize(0.5) => '500 KB'
 * humanizeSize(1) => '1 MB'
 */
function humanizeSize(size?: number) {
  if (!size) {
    return '0 KB';
  }
  if (size < 1) {
    return `${size * 1000} KB`;
  }
  return `${size} MB`;
}

interface Props {
  errorReason: string;
  sizeLimit?: number;
}

function ErrorReason({ errorReason, sizeLimit }: Props) {
  if (!errorReason) return null;

  return (
    <>
      <Icon
        name="alert-triangle"
        className="text-destructive size-7"
      />
      <strong className="text-center text-sm">{errorMessages[errorReason]}</strong>
      {errorReason === 'sizeLimit' && <span className="text-center text-sm">Yüklemek istediğiniz dosya {humanizeSize(sizeLimit)}tan büyük olmamalıdır.</span>}
    </>
  );
}

export default ErrorReason;
