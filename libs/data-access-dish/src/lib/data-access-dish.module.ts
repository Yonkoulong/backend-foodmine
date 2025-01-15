import { Module } from '@nestjs/common';
import { DishService } from './service/dish.service';
import { DishController } from './controller/dish.controller';
import { PrismaClientModule } from '@foodmine-be/prisma-client';

@Module({
  imports: [PrismaClientModule],
  controllers: [DishController],
  providers: [DishService],
})
export class DataAccessDishModule {}
