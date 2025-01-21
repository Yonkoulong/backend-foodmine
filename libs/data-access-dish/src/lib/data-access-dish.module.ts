import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { PrismaClientModule } from '@foodmine-be/prisma-client';
import { DishController } from './dish.controller';
import { CommonModule } from '@foodmine-be/common';

@Module({
  imports: [PrismaClientModule, CommonModule],
  controllers: [DishController],
  providers: [
    DishService
  ],
})
export class DataAccessDishModule {}
