import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { Dish } from "@prisma/client";
import { DishService } from "./dish.service";
import { CreateDishDto } from "./dto/create-dish.dto";
import { Role, Roles } from "@foodmine-be/common";
import { GetDishesDto } from "./dto/get-dishes.dto";

@Controller('dish')
export class DishController {
    
    constructor(private dishService: DishService) {}

    @Get('all')
    getAllDishes(@Query() query: GetDishesDto) {                
        const params = {
            skip: query.skip ?? 0,
            take: query.take ?? 10,
            cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
            where: query.where ? JSON.parse(query.where) : undefined,
            orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
            select: query.select ? JSON.parse(query.select) : undefined,
        }

        return this.dishService.getDishes(params);
    }

    @Get(':id')
    getDish(@Param('id', ParseIntPipe) id: number) {
        return this.dishService.getDishById(id);
    }

    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    @Post('create-dish')
    createDish(@Body() dto: CreateDishDto): Promise<Dish> {
        return this.dishService.createDish(dto);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    editDishById() {
        return 'patch';
    }

    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteDishById(@Param('id', ParseIntPipe) id: number) {
        return this.dishService.deleteDish(id)
    }
}


