import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";


export class GetDishesDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    skip?: number = 0;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    take?: number = 10;

    @IsOptional()
    @IsString()
    cursor?: string;

    @IsOptional()
    @IsString()
    where?: string;

    @IsOptional()
    @IsString()
    orderBy?: string;

    @IsOptional()
    @IsString()
    select?: string;
}