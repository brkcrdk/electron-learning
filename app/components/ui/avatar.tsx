import { Avatar as AvatarPrimitive } from 'radix-ui';
import { type HTMLAttributes, type ImgHTMLAttributes, useState } from 'react';

import cn from '@app/utils/cn';

/**
 * Avatarda verilen `name` propuna ait değeri avatarın yanında render edip etmek istediğimizi
 * ifade eden proptur. Eğer render etmek istersek `hideAvatarName` propunu `false` yapmamız gerekiyor.
 * Bunun yanında ismi render ettiğimiz span elementinin propsunu `nameElementProps` propu ile veriyoruz.
 *
 * @defaultValue `{ hideAvatarName: true }`
 */
type AvatarNameProps =
  | {
      hideAvatarName: false;
      nameElementProps?: HTMLAttributes<HTMLSpanElement>;
    }
  | {
      hideAvatarName: true;
    };

const getFirstLetters = (name: string) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase())
    .join('');
};
const getRandomColor = () => {
  const colors = ['bg-amber-500', 'bg-indigo-500', 'bg-sky-500', 'bg-emerald-500', 'bg-cyan-500', 'bg-fuchsia-500'];
  const randomIndex = Math.floor(Math.random() * colors.length - 1);
  return colors[randomIndex === -1 ? 0 : randomIndex];
};

interface Props {
  name: string;
  avatarRootProps?: AvatarPrimitive.AvatarProps;
  avatarImageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'alt'>;
  avatarFallbackProps?: AvatarPrimitive.AvatarFallbackProps;
  avatarNameProps?: AvatarNameProps;
}

function Avatar({ avatarRootProps, name, avatarImageProps, avatarFallbackProps, avatarNameProps = { hideAvatarName: true } }: Props) {
  const [imgError, setImgError] = useState(false);
  const firstLetters = getFirstLetters(name);

  /**
   * Rerender olma durumunda rengin değişmemesi için memoize edildi.
   */
  const computedBackgroundColor = getRandomColor();

  return (
    <>
      <AvatarPrimitive.Root
        {...avatarRootProps}
        className={cn('relative flex size-8 items-center justify-center overflow-hidden rounded-full', avatarRootProps?.className)}
      >
        {imgError ? (
          <AvatarPrimitive.Fallback
            {...avatarFallbackProps}
            className={cn(
              'flex size-full items-center justify-center text-sm leading-normal text-white',
              computedBackgroundColor,
              avatarFallbackProps?.className
            )}
          >
            {firstLetters}
          </AvatarPrimitive.Fallback>
        ) : (
          <img
            alt={name || 'avatar-default-alt-text'}
            draggable={false}
            onError={() => {
              setImgError(true);
            }}
            {...avatarImageProps}
            src={avatarImageProps ? avatarImageProps.src || '/dummy.png' : '/dummy.png'}
            className={cn('size-fit', avatarImageProps?.className)}
          />
        )}
      </AvatarPrimitive.Root>
      {avatarNameProps.hideAvatarName ? null : <span {...avatarNameProps.nameElementProps}>{name}</span>}
    </>
  );
}
export default Avatar;
