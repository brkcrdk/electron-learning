import dayjs from '@app/utils/dayjs';

interface Props {
  date: Date;
}

/**
 * Tablolarda kullanılan tarih bilgilerini görüntülemek için kullanılan bir hücre componentidir.
 * Bu bilgiler genelde spesifik bir tarihi ifade ettiği için ilk bakışta ne zaman olduğunu anlamak
 * için hesaplama gerektiği için bunun yerine direk olarak kaç zaman önce olduğunu gösteren bir süre
 * belirtilir. Tam tarihi belirtmek için de tooltip kullanılır ve bu şekilde her iki şekilde de kullanıcıya
 * arzulanan bilgiler sunulabilir.
 *
 * @example
 * Örnek girdi: 2025-04-15T12:00:00.000Z
 * Örnek çıktı: 1 saat önce, 4 ay önce, 1 yıl önce
 * Örnek tooltip çıktısı: 15 Nisan 2025 veya 15 Nisan 2025 12:00:00
 */
function RelativeDateCell({ date }: Props) {
  return (
    <div
      className="tooltip"
      data-tip={dayjs(date).format('DD.MM.YYYY HH:mm')}
    >
      {dayjs(date).fromNow()}
    </div>
  );
}
export default RelativeDateCell;
