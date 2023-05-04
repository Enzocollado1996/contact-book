export default () => ({
  DB_PORT: process.env.PORT,
  DB_HOST: process.env.HOST,
  DB_USER: process.env.USERNAME,
  DB_PASSWORD: process.env.PASSWORD,
  DB_DATABASE: process.env.DATABASE,
});
