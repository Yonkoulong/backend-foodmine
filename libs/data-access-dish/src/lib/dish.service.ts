import { PrismaService } from '@foodmine-be/prisma-client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Dish, Prisma } from '@prisma/client';
import { CreateDishDto } from './dto/create-dish.dto';
import { EditDishDto } from './dto/edit-dish.dto';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async getDishes(params: {
    skip?: number; //skip a certain number of records for pagination
    take?: number; //Limit the number of records fetched
    cursor?: Prisma.DishWhereUniqueInput; // Cursor for pagination to fetch records starting from a specific point
    where?: Prisma.DishWhereInput; // Filters applied to fetch dishes based on certain conditions 
    orderBy?: Prisma.DishOrderByWithRelationInput; // Sort the records based on a specific field
  }): Promise<Dish[]> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params;

    // Ensure 'take' is within a reasonable limit
    if (take > 100) {
      throw new BadRequestException('Yon cannot fetch more than 100 dishes at a time');
    }

    const dishes = await this.prisma.dish.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    if (!dishes || dishes.length === 0) {
      throw new Error('Dishes not found');
    }

    return dishes;
  }

  async getDishById(id: number): Promise<Dish> {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new Error('Dish not found');
    }

    return dish;
  }

  async createDish(dto: CreateDishDto): Promise<Dish> {
    const dish = await this.prisma.dish.create({ data: { ...dto } });

    return dish;
  }

  async updateDish(id: number, dto: EditDishDto): Promise<Dish> {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new Error('Dish not found');
    }

    return this.prisma.dish.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteDish(id: number): Promise<Dish> {
    return this.prisma.dish.delete({
      where: {
        id,
      },
    });
  }
}
