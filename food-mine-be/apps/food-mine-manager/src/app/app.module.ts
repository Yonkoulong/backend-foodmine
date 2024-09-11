import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminModule } from '@food-mine-be/firebase-admin';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //Load .env globally
    FirebaseAdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
