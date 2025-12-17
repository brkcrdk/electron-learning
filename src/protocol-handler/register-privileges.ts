import { protocol } from 'electron';

/**
 * Custom protocol'ü privileged olarak kaydeder.
 * Bu işlem app.whenReady() ÖNCESİNDE yapılmalı!
 *
 * - standard: relative URL'lerin çalışması için gerekli
 * - secure: güvenli scheme olarak işaretler
 * - supportFetchAPI: fetch API'nin çalışması için gerekli
 * - stream: video/audio stream'lerinin düzgün çalışması için gerekli
 */
function registerContentProtocolPrivileges() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'content',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        stream: true,
      },
    },
  ]);
}

export default registerContentProtocolPrivileges;
