import { sql, type AnyColumn } from 'drizzle-orm';

interface IdProps {
  id: AnyColumn;
  parentId: AnyColumn;
}

/**
 * Bir satırın child kaydı olup olmadığını gösteren tekrar kullanılabilir boolean kolon.
 * EXISTS ile ilk eşleşmede durur; SQLite 0/1 değerini boolean'a çevirir.
 */
function hasChildrenColumn<T extends IdProps>(table: T) {
  return sql<boolean>`EXISTS(SELECT 1 FROM ${table} WHERE ${table.parentId} = ${table.id})`.mapWith(Boolean).as('hasChildren');
}

export default hasChildrenColumn;
