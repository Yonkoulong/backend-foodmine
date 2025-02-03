import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { PrismaClientModule } from '@foodmine-be/prisma-client';
import { DishController } from './dish.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [DishController],
  providers: [
    DishService
  ],
})
export class DataAccessDishModule {}
