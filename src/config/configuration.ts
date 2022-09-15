
/*
  Config Documents
  - https://docs.nestjs.com/techniques/configuration
*/

import { IsUppercase } from "class-validator";

export const AppConfig = () => ({
  app: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000
  },
  db: {
    uri: dbConnURI(),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
});

function dbConnURI() {
  let type = process.env.DB_TYPE || 'mongodb'
  let host = process.env.DB_HOST
  let port = parseInt(process.env.DB_PORT, 10) || 12002
  let name = process.env.DB_NAME
  return `${type}://${host}:${port}/${name}`  
}