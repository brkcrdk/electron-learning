import Router from 'next/router';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import corpeoConfig from '@/corpeo.config';

interface Props {
  body: FormData;
  controller: AbortController;
  uploadType: FileUploadTypes;
  enableChunkUpload: boolean;
}

const baseUrl = `${corpeoConfig.baseUrl}/api/upload`;

async function fileUpload({ body, controller, uploadType, enableChunkUpload }: Props) {
  const accessToken = getCookie('TOKEN');
  const refreshToken = getCookie('REFRESH_TOKEN');

  /**
   * Eğer chunk upload ise chunkTotalOffset=-1 parametresini ekliyoruz. Bu eklenirse ve chunklı dosya
   * atılırsa backend tarafından dosya işlenemiyor.
   */
  const computedUrl = enableChunkUpload ? `${baseUrl}/${uploadType}?chunkTotalOffset=-1` : `${baseUrl}/${uploadType}`;

  const res = await fetch(computedUrl, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'uploader-origin': corpeoConfig.baseUrl,
    },
    body,
    signal: controller.signal,
  });

  if (res.status === 401) {
    const responseRefresh = await fetch(`${corpeoConfig.baseUrl}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    try {
      const {
        data: { TOKEN: newAccessToken, REFRESH_TOKEN: newRefreshToken },
      } = await responseRefresh.json();

      if (newAccessToken && newRefreshToken) {
        setCookie('TOKEN', newAccessToken);
        setCookie('REFRESH_TOKEN', newRefreshToken);

        await fileUpload({ body, controller, uploadType, enableChunkUpload });
      }
    } catch (error) {
      deleteCookie('TOKEN');
      deleteCookie('REFRESH_TOKEN');
      controller.abort('upload sırasında bir hata oldu.');
      await Router.push('/login');
    }
  }

  return res;
}

export default fileUpload;
