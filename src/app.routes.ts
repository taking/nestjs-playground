import { Routes } from '@nestjs/core';
import { HelloModule } from '@hello/hello.module';
import { UsersModule } from '@users/users.module';

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

// export const routes: Routes = routes;