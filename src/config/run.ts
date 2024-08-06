import dataSource from './typeorm.config';

async function runMigrations() {
  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1); // Exit process with failure
  }
}

runMigrations();
