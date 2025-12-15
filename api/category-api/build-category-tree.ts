import type { CategoryWithChildren } from '@db/schema';
import type { Category } from '@db/schema';

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
