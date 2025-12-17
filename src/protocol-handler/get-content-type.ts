/**
 * Content-Type'ı dosya uzantısına göre belirle
 */
function getContentType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    pdf: 'application/pdf',
    html: 'text/html',
    htm: 'text/html',
  };
  return contentTypes[ext || ''] || 'application/octet-stream';
}

export default getContentType;
