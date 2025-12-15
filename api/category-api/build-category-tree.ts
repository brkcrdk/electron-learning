import type { CategoryWithChildren } from '@db/schema';
import type { Category } from '@db/schema';

/**
 * Düz bir kategori dizisini, parent-child ilişkilerine göre ağaç (tree) yapısına dönüştürür.
 *
 * Her kategori kendi alt kategorilerini `children` alanında taşır.
 * Ebeveyni (parentId) olmayan kategoriler "root" (üst seviye) olarak kabul edilir.
 * Eğer bir kategori ebeveynine ulaşılamazsa, güvenlik amacıyla root olarak da eklenir.
 *
 * Örnek:
 * Girdi:
 * [
 *   { id: 1, name: "Yazılım", parentId: null },
 *   { id: 2, name: "Frontend", parentId: 1 },
 *   { id: 3, name: "Backend", parentId: 1 },
 *   { id: 4, name: "React", parentId: 2 }
 * ]
 *
 * Çıktı:
 * [
 *   {
 *     id: 1,
 *     name: "Yazılım",
 *     parentId: null,
 *     children: [
 *       {
 *         id: 2,
 *         name: "Frontend",
 *         parentId: 1,
 *         children: [
 *           {
 *             id: 4,
 *             name: "React",
 *             parentId: 2
 *           }
 *         ]
 *       },
 *       {
 *         id: 3,
 *         name: "Backend",
 *         parentId: 1
 *       }
 *     ]
 *   }
 * ]
 */
function buildCategoryTree(rows: Category[]): CategoryWithChildren[] {
  const map = new Map<number, CategoryWithChildren>();
  const roots: CategoryWithChildren[] = [];

  // Tüm kategorileri map'e ekle
  for (const row of rows) {
    map.set(row.id, { ...row, children: [] });
  }

  // parentId'ye göre ağaç yapısını kur
  for (const node of map.values()) {
    if (node.parentId == null) {
      // parentId yoksa root kategori
      roots.push(node);
      continue;
    }

    const parent = map.get(node.parentId);

    if (parent) {
      parent.children!.push(node);
    } else {
      // parent kaydı bulunamazsa güvenlik için root'a ekle
      roots.push(node);
    }
  }

  // Boş children dizilerini kaldır (opsiyonel)
  for (const node of map.values()) {
    if (node.children && node.children.length === 0) {
      delete node.children;
    }
  }

  return roots;
}

export default buildCategoryTree;
