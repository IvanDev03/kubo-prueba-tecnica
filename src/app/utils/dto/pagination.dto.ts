import { Type } from "class-transformer";
import { IsObject, IsOptional, IsPositive, IsString } from "class-validator";

export class PaginationDto {
   
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page!: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit!: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    offset!: number;

    @IsOptional()
    @IsObject()
    filters?: Record<string, string>;

    @IsOptional()
    @IsString()
    orderBy?: string;

    @IsOptional()
    @IsString()
    orderDirection?: "ASC" | "DESC";
}