export default () => ({
  db_host: process.env.DB_HOST || 'db',
  db_port: +process.env.DB_PORT || 3306,
  db_user: process.env.DB_USER || 'root',
  db_pass: process.env.DB_PASS || '12345',
  db_name: process.env.DB_NAME || 'studiospace',
  jwt_secret: process.env.JWT_SECRET || '12345',
});

/*export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt_secret: process.env.JWT_SECRET || '12345',
});*/
