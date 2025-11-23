// src/db/index.ts
import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

import type { DatabaseType } from './types';

const sqlite = new Database('database.db');

export const db = new Kysely<DatabaseType>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});
