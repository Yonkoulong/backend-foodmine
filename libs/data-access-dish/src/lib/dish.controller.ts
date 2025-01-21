import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { Dish } from "@prisma/client";
import { DishService } from "./dish.service";
import { CreateDishDto } from "./dto/create-dish.dto";
import { Role, Roles } from "@foodmine-be/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt-at'))
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


