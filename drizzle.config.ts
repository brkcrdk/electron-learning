import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './database.db', // Development için, production'da app.getPath('userData') kullanılacak
  },
} satisfies Config;
