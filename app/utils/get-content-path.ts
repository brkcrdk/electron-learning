/**
 * Relative path'i custom protocol URL'ine çevirir (renderer'da kullanmak için)
 *
 * Örnek: "content/videos/file.mp4" -> "content://content/videos/file.mp4"
 *
 * @param relativePath - Veritabanından gelen relative path (örn: "content/videos/file.mp4")
 * @returns Custom protocol URL (örn: "content://content/videos/file.mp4")
 */
function getContentPath(relativePath?: string): string {
  if (!relativePath) return '';
  return `content://${relativePath}`;
}

export default getContentPath;
