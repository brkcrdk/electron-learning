# Kategoriler Veritabanı Tasarımı

## Genel Bakış

Bu dokümantasyon, nested (iç içe) kategoriler için veritabanı tasarımını açıklar. **Adjacency List** yaklaşımı kullanılarak, SQLite veritabanında kategoriler saklanır.

### Temel Özellikler

- ✅ Nested kategoriler (sonsuz derinlik desteği, pratikte 4-5 seviye bekleniyor)
- ✅ Root kategoriler (parent_id = NULL)
- ✅ Lazy loading desteği
- ✅ Performans optimizasyonu için index'li sorgular
- ✅ CRUD işlemleri (CREATE, READ, UPDATE, DELETE)

---

## Veritabanı Şeması

### Tablo Yapısı

```sql
CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES category(id),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Performans için zorunlu index
CREATE INDEX idx_category_parent_id ON category(parent_id);
```

### Drizzle ORM Schema

```typescript
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const category = sqliteTable(
  'category',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    parentId: integer('parent_id').references(() => category.id),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    parentIdx: index('idx_category_parent_id').on(table.parentId),
  })
);

export type Category = typeof category.$inferSelect;
export type NewCategoryPayload = typeof category.$inferInsert;
```

---

## Temel SQL Sorguları

### 1. Root Kategorileri Getir

```sql
SELECT * FROM category WHERE parent_id IS NULL;
```

**Drizzle ile:**
```typescript
import { isNull } from 'drizzle-orm';

const rootCategories = await db
  .select()
  .from(category)
  .where(isNull(category.parentId));
```

### 2. Bir Kategorinin Çocuklarını Getir (Lazy Loading)

```sql
SELECT * FROM category WHERE parent_id = ?;
```

**Drizzle ile:**
```typescript
import { eq } from 'drizzle-orm';

const children = await db
  .select()
  .from(category)
  .where(eq(category.parentId, parentId));
```

### 3. Kategorinin Çocuğu Olup Olmadığını Kontrol Et (hasChildren)

**Yöntem 1: EXISTS (Önerilen - Daha Hızlı)**
```sql
SELECT 
  c.*,
  EXISTS(SELECT 1 FROM category WHERE parent_id = c.id) as has_children
FROM category c
WHERE c.parent_id IS NULL;
```

**Yöntem 2: COUNT (Çocuk Sayısı da Döner)**
```sql
SELECT 
  c.*,
  (SELECT COUNT(*) FROM category WHERE parent_id = c.id) as child_count
FROM category c
WHERE c.parent_id IS NULL;
```

**Drizzle ile EXISTS:**
```typescript
import { sql } from 'drizzle-orm';

const categoriesWithChildren = await db
  .select({
    id: category.id,
    name: category.name,
    parentId: category.parentId,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    hasChildren: sql<boolean>`
      EXISTS(SELECT 1 FROM ${category} WHERE parent_id = ${category.id})
    `.as('has_children'),
  })
  .from(category)
  .where(isNull(category.parentId));
```

### 4. Bir Kategorinin Tüm Torunlarını Getir (Recursive CTE)

```sql
WITH RECURSIVE category_tree AS (
  -- Başlangıç: İlk kategori
  SELECT id, name, parent_id, 0 as depth
  FROM category
  WHERE id = ?
  
  UNION ALL
  
  -- Recursive: Alt kategorileri bul
  SELECT c.id, c.name, c.parent_id, ct.depth + 1
  FROM category c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;
```

**Not:** Bu sorgu şu anda kullanılmayacak çünkü lazy loading kullanıyoruz. Gelecekte içerik filtreleme için gerekebilir.

### 5. Bir Kategorinin Tüm Atalarını Getir (Breadcrumb)

```sql
WITH RECURSIVE ancestors AS (
  SELECT id, name, parent_id, 0 as level
  FROM category
  WHERE id = ?
  
  UNION ALL
  
  SELECT c.id, c.name, c.parent_id, a.level + 1
  FROM category c
  JOIN ancestors a ON c.id = a.parent_id
)
SELECT * FROM ancestors ORDER BY level DESC;
```

---

## CRUD İşlemleri

### CREATE - Yeni Kategori Ekle

**Root Kategori:**
```typescript
await db.insert(category).values({
  name: 'Web Development',
  parentId: null,
});
```

**Alt Kategori:**
```typescript
await db.insert(category).values({
  name: 'Frontend',
  parentId: 1, // Web Development'ın id'si
});
```

### READ - Kategori Okuma

**Tek Kategori:**
```typescript
const cat = await db.query.category.findFirst({
  where: eq(category.id, categoryId),
});
```

**Çocukları ile Birlikte:**
```typescript
const cat = await db.query.category.findFirst({
  where: eq(category.id, categoryId),
  with: {
    children: true, // Eğer Drizzle relations tanımlıysa
  },
});
```

### UPDATE - Kategori Güncelleme

**İsim Değiştirme:**
```typescript
await db
  .update(category)
  .set({
    name: 'Yeni İsim',
    updatedAt: new Date(),
  })
  .where(eq(category.id, categoryId));
```

**Not:** Taşıma (parent_id değiştirme) işlemi yapılmayacak.

### DELETE - Kategori Silme

**Önemli:** Bir kategori silinmeden önce çocuklarının olup olmadığı kontrol edilmelidir.

**Kontrol ile Silme:**
```typescript
// Önce kontrol et
const hasChildren = await db.query.category.findFirst({
  where: eq(category.parentId, categoryId),
});

if (hasChildren) {
  throw new Error('Bu kategorinin çocukları var, önce onları silin');
}

// Sonra sil
await db.delete(category).where(eq(category.id, categoryId));
```

**Alternatif: CASCADE Silme (Çocukları da sil)**
```sql
-- Foreign key constraint ile
parent_id INTEGER REFERENCES category(id) ON DELETE CASCADE
```

**Dikkat:** CASCADE kullanırsanız, bir kategori silindiğinde tüm alt ağacı silinir. Kullanıcıya bu konuda uyarı gösterilmelidir.

---

## API Endpoint'leri

### Önerilen Endpoint Yapısı

```
GET    /api/categories/roots              # Root kategoriler + hasChildren
GET    /api/categories?parent_id={id}     # Bir kategorinin çocukları + hasChildren
POST   /api/categories                    # Yeni kategori oluştur
PATCH  /api/categories/:id                # Kategori güncelle
DELETE /api/categories/:id                # Kategori sil (hasChildren kontrolü)
```

### Response Formatı

**Root Kategoriler:**
```json
[
  {
    "id": 1,
    "name": "Web Development",
    "parentId": null,
    "hasChildren": true,
    "createdAt": 1234567890,
    "updatedAt": 1234567890
  },
  {
    "id": 5,
    "name": "Backend",
    "parentId": 1,
    "hasChildren": false,
    "createdAt": 1234567890,
    "updatedAt": 1234567890
  }
]
```

---

## Frontend Lazy Loading Yaklaşımı

### Mantık Akışı

1. **İlk Yükleme:** Root kategorileri getir (`/api/categories/roots`)
2. **hasChildren Kontrolü:** Her kategori için `hasChildren` flag'ini kontrol et
3. **Expand İşlemi:** Kullanıcı bir kategoriyi expand ettiğinde:
   - `GET /api/categories?parent_id={id}` isteği at
   - Gelen kategorileri göster
   - Her biri için tekrar `hasChildren` kontrolü yap
4. **Recursive:** Çocukları da expand edilebilir olduğu için aynı işlem tekrarlanır

### Örnek Pseudo Code

```typescript
async function loadCategories(parentId: number | null = null) {
  const url = parentId 
    ? `/api/categories?parent_id=${parentId}`
    : `/api/categories/roots`;
  
  const categories = await fetch(url).then(r => r.json());
  
  for (const category of categories) {
    // Kategoriyi UI'da göster
    displayCategory(category);
    
    // Eğer çocuğu varsa, expand edilince yükle
    if (category.hasChildren) {
      // Kullanıcı expand butonuna tıkladığında:
      const children = await loadCategories(category.id);
      displayChildren(category.id, children);
    }
  }
}
```

---

## Performans Notları

### Neden Adjacency List?

- ✅ **4-5 seviye derinlik** için yeterli performans
- ✅ **Lazy loading** ile sadece açılan dallar yüklenir
- ✅ **Basit yapı** - bakımı kolay
- ✅ **Her seviye için tek sorgu** - index'li sorgu çok hızlı

### Index Zorunluluğu

`parent_id` sütunu üzerinde index **zorunludur**:

```sql
CREATE INDEX idx_category_parent_id ON category(parent_id);
```

Bu index olmadan:
- ❌ Root kategoriler sorgusu yavaşlar
- ❌ Çocukları getirme sorgusu yavaşlar
- ❌ Lazy loading performansı düşer

### Optimizasyon İpuçları

1. **Sadece ihtiyacın olan kolonları seç:**
   ```typescript
   // ❌ Kötü
   SELECT * FROM category WHERE parent_id = ?;
   
   // ✅ İyi
   SELECT id, name, parent_id FROM category WHERE parent_id = ?;
   ```

2. **Lazy loading için limit ekle (gelecekte):**
   ```sql
   SELECT * FROM category 
   WHERE parent_id = ? 
   ORDER BY name 
   LIMIT 20;
   ```

---

## Gelecek İyileştirmeler

### İçerik Filtreleme İçin

Eğer içeriklerde kategori filtreleme yapılacaksa ve **alt kategoriler de dahil** edilecekse, şu yaklaşımlar değerlendirilebilir:

1. **Materialized Path:** `path` sütunu eklenir (`/1/2/3/` formatında)
2. **Closure Table:** İlişki tablosu eklenir

**Not:** Şu an için gerekli değil. İhtiyaç olursa migration yapılabilir.

### Migration Notları

- Adjacency List'ten diğer yaklaşımlara geçiş **zor değil**
- SQLite `ALTER TABLE` esnektir
- Mevcut veriler kaybolmaz, sadece yeni sütunlar/tablolar eklenir
- Hybrid yaklaşım ile aşamalı geçiş yapılabilir

---

## Edge Case'ler

### 1. Circular Reference

**Problem:** Bir kategoriyi kendi alt kategorisinin altına taşıma.

**Çözüm:** Taşıma işlemi yapılmadığı için şu an için sorun değil. Gelecekte eklenirse:

```sql
WITH RECURSIVE descendants AS (
  SELECT id FROM category WHERE id = ?  -- Mevcut kategori
  UNION ALL
  SELECT c.id FROM category c
  JOIN descendants d ON c.parent_id = d.id
)
SELECT COUNT(*) as is_descendant 
FROM descendants 
WHERE id = ?;  -- Hedef parent id
-- Sonuç 0 ise güvenli, >0 ise circular reference!
```

### 2. Orphan Kayıtlar

**Problem:** Parent'ı olmayan ama root olmayan kayıtlar.

**Çözüm:** Foreign key constraint ile:

```sql
parent_id INTEGER REFERENCES category(id) ON DELETE CASCADE
```

### 3. Çok Fazla Çocuk

**Problem:** Bir kategorinin 1000+ çocuğu varsa.

**Çözüm:** Pagination eklenebilir (şu an için gerekli değil).

---

## Özet

- ✅ **Adjacency List** yaklaşımı kullanılıyor
- ✅ **Lazy loading** ile performanslı çalışıyor
- ✅ **hasChildren** flag'i ile frontend'e bilgi veriliyor
- ✅ **4-5 seviye derinlik** için yeterli performans
- ✅ **CRUD işlemleri** mevcut (taşıma hariç)
- ✅ **Index zorunlu** - performans için kritik

---

## Referanslar

- [Adjacency List Pattern](https://en.wikipedia.org/wiki/Adjacency_list)
- [SQLite Recursive CTE](https://www.sqlite.org/lang_with.html)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
