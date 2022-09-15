import { Routes } from '@nestjs/core';
import { HelloModule } from '@resources/hello/hello.module';
import { UsersModule } from '@resources/users/users.module';

export const AppRoutes : Routes = [
  {
    path: 'hello',
    module: HelloModule,
  },
  {
    path: 'users',
    module: UsersModule,
  },
];