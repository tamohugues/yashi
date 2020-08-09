export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  FTP: {
    HOST: 'localhost',
    PORT: 21,
    USER: 'anonymous',
    PASSWORD: 'anonymous@',
  },
  DB: {
    DIALECT: 'mysql',
    HOST: 'localhost',
    PORT: 3306,
    USERNAME: 'root',
    PASSWORD: 'Hugues8688',
    DATABASE: 'yashi_db',
    AUTOLOADMODELS: true,
    SYNCHRONIZE: true,
  },
});
