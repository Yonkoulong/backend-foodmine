import { PrismaService } from '@foodmine-be/prisma-client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Dish, Prisma } from '@prisma/client';
import { CreateDishDto } from './dto/create-dish.dto';
import { EditDishDto } from './dto/edit-dish.dto';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async getDishes(params: {
    skip: number;
    take: number;
    cursor?: Prisma.DishWhereUniqueInput;
    where?: Prisma.DishWhereInput;
    orderBy?: Prisma.DishOrderByWithRelationInput;
    select?: Prisma.DishSelect;
  }): Promise<Dish[]> {
    const { skip = 0, take = 10, cursor, where, orderBy, select } = params;
    
    // Ensure 'take' is within a reasonable limit
    if (take > 100) {
      throw new BadRequestException(
        'Yon cannot fetch more than 100 dishes at a time'
      );
    }

    const dishes = await this.prisma.dish.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
    
    return dishes;
  }

  async getDishById(id: number): Promise<Dish> {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
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
