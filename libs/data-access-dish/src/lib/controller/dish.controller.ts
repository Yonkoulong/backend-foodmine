import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateDishDto } from "../dto/create-dish.dto";
import { DishService } from "../service/dish.service";
import { Dish } from "@prisma/client";

@Controller('dish')
export class DishController {
    
    constructor(private dishService: DishService) {}

    @Get(':id')
    getDish(@Param('id', ParseIntPipe) id: number) {
        return this.dishService.getDishById(id);
    }

    @Get('all')
    getAllDishes() {
        return this.dishService.getDishes({});
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createDish(@Body() dto: CreateDishDto): Promise<Dish> {
        return this.dishService.createDish(dto);
    }


    @Patch(':id')
    editDishById() {
        return 'patch';
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteDishById(@Param('id', ParseIntPipe) id: number) {
        return this.dishService.deleteDish(id)
    }
}