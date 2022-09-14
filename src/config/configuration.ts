
import { ConfigModule } from '@nestjs/config';

/*
  Config Documents
  - https://docs.nestjs.com/techniques/configuration
*/

export default () => ({
  isGlobal: true,
  envFilePath: '.env',
  // envFilePath: process.env.NODE_ENV === 'dev' ? '.env.develop' : '.env.test',
  // ignoreEnvFile: process.env.NODE_ENV === 'prod',
  port: parseInt(process.env.PORT, 10) || 3000,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  // }
});