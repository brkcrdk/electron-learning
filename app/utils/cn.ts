import { cx } from 'class-variance-authority';
import { type ClassNameValue, extendTailwindMerge } from 'tailwind-merge';

/**
 * NOTE: TwMerge stillendirmeleri mergelerken sadece sadece tw stillendirmelerini dikkate alıyor.
 * Biz de stillendirmeleri mergelerken başında `cs-` prefixi olmadan yokmuş gibi davranmasını sağlıyoruz.
 * Böylece hem classlarımızı koruyoruz hem de mergelenirnek doğru çalışmasını sağlıyoruz.
 */
const twMerge = extendTailwindMerge({
  experimentalParseClassName: ({ className, parseClassName }) => {
    const parsed = parseClassName(className);

    return {
      ...parsed,
      baseClassName: className.startsWith('cs-') ? parsed.baseClassName.split('cs-')[1] : parsed.baseClassName,
    };
  },
});

function cn(...inputs: ClassNameValue[]) {
  return twMerge(cx(inputs));
}

export default cn;
