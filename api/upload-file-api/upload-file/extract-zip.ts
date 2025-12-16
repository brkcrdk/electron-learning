import StreamZip from 'node-stream-zip';

/**
 * Verilen ZIP dosyasını hedef klasöre extract eder
 */
async function extractZip(zipFullPath: string, targetDirFull: string) {
  const zip = new StreamZip.async({ file: zipFullPath });

  try {
    // null -> tüm entry'leri extract et
    await zip.extract(null, targetDirFull);
  } finally {
    await zip.close();
  }
}

export default extractZip;
