export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  FTP: {
    HOST: 'ftp.clickfuel.com',
    PORT: 21,
    USER: 'ftp_integration_test',
    PASSWORD: '6k0Sb#EXT6jw',
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
    TIMESTAMPS: false,
  },
});
