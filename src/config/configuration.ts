
/*
  Config Documents
  - https://docs.nestjs.com/techniques/configuration
*/

export const AppConfig = () => ({
  app: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000
  },
  database: {},
});