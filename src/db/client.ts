import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const DATABASE_URL = 'file:./sqlite/app.db';

const client = createClient({
  url: DATABASE_URL,
});

export const db = drizzle(client, { schema });
