import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessDishModule } from '@foodmine-be/data-access-dish';
import { DataAccessAuthModule } from '@foodmine-be/data-access-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataAccessAuthModule,
    DataAccessDishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
