import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    roles: text('roles', { enum: ['super-admin', 'admin', 'user'] })
      .notNull()
      .default('user'),
    status: text('status', { enum: ['active', 'passive'] })
      .notNull()
      .default('active'),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
  },
  table => [index('roles_idx').on(table.roles)]
);

export type User = typeof users.$inferSelect;
export type NewUserPayload = typeof users.$inferInsert;
