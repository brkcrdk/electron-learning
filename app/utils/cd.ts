/**
 * * Çalışma mantığı: Function sadece değer kontrolü yapar. Kontrol edilen değer true ise boş string döner false ise
 * undefined döner ve böylece bu attribute değeri elemente hiç eklenmemiş olur.
 *
 * - Bu function componentlerde kullanacağımız data-attributeları eğer bir değer var/yok şeklinde çalışabilecekse
 * bunu hesaplar ve ona göre olması gereken data attribute değerini döner. Bu standartı kullanarak `tailwind`in
 * data attribure kullanımını kolaylaştırabiliyoruz.
 *
 *
 * ÖRN:
 * ```jsx
 * // Bu eski kullanım
 * <div
 *   data-sortable="false"
 *   className="size-4 text-inherit data-[sortable='false']:hidden"
 * />
 * // Yeni kullanım
 * <div
 *   data-sortable
 *   className="size-4 text-inherit data-sortable:hidden"
 * />
 * ```
 *
 */
function cd<T>(condition: T) {
  return condition ? '' : undefined;
}

export default cd;
