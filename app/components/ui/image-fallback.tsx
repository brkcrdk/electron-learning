import { useState, type ImgHTMLAttributes } from 'react';

import imageFallback from '@app/assets/cover.png';

const ImageWithFallback = ({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  const [imgSrc, setImgSrc] = useState(src || '/');

  return (
    <img
      {...props}
      alt={props.alt}
      src={imgSrc}
      onError={() => {
        console.error('errored image');
        setImgSrc(imageFallback);
      }}
    />
  );
};

export default ImageWithFallback;
