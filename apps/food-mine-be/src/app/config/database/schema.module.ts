import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from '../../entity/dishes/dish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  exports: [MongooseModule], // Export to make schemas available for other modules
})
export class SchemaModule {}
