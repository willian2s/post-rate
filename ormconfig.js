module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  cache: {
    duration: 20000,
  },
  entities: [process.env.TYPEORM_ENTITIES_DIR],
  migrations: [process.env.TYPEORM_MIGRATIONS_DIR],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/models',
  },
};
