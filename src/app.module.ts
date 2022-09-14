import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/configuration';

import { HelloModule } from './hello/hello.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
    }),
    HelloModule,
    RouterModule.register([
      {
        path: 'hello',
        module: HelloModule,
      },
    ]),
  ],
})
export class AppModule {}
