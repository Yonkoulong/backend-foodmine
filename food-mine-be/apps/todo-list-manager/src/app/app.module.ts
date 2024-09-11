import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminModule } from '@food-mine-be/firebase-admin';

@Module({
  imports: [
    AuthModule,
    TodoListModule,
    FirebaseAdminModule,
    ConfigModule.forRoot({ isGlobal: true }), //Load .env globally
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
