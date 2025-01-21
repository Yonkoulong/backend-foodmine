import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataAccessDishModule } from '@foodmine-be/data-access-dish';
import { DataAccessAuthModule } from '@foodmine-be/data-access-auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@foodmine-be/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    DataAccessAuthModule,
    DataAccessDishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
