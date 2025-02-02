import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/neon-http/migrator';

dotenv.config();

import { db } from './index';

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, './migrations'),
    });
    console.log(`Migrations complete`);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
