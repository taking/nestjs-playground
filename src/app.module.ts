import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '@config/configuration';

import { AppRoutes } from '@root/app.routes';
import { HelloModule } from '@hello/hello.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AppConfig],
    }),
    RouterModule.register(AppRoutes),
    HelloModule,
    UsersModule,
  ],
})
export class AppModule {}
