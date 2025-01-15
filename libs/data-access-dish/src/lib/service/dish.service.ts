import { PrismaService } from '@foodmine-be/prisma-client';
import { Injectable } from '@nestjs/common';
import { Dish, Prisma } from '@prisma/client';
import { CreateDishDto } from '../dto/create-dish.dto';
import { EditDishDto } from '../dto/edit-dish.dto';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async getDishes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DishWhereUniqueInput;
    where?: Prisma.DishWhereInput;
    orderBy?: Prisma.DishOrderByWithRelationInput;
  }): Promise<Dish[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const dishes = await this.prisma.dish.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    if (!dishes) {
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
