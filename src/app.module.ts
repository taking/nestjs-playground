import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppRoutes } from '@root/app.routes';
import { AppConfig } from '@config/configuration';
import { HelloModule } from '@resources/hello/hello.module';
import { UsersModule } from '@resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AppConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('db.uri'),
        user: config.get<string>('db.user'),
        password: config.get<string>('db.password'),
        connectionFactory: (connection) => {
          return connection;
        }
      })
    }),
    RouterModule.register(AppRoutes),
    HelloModule,
    UsersModule,
  ],
})
export class AppModule {}