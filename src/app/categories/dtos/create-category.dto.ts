import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name!: string;
    
    @IsInt({message: 'Movie ID must be an integer'})
    @IsOptional()
    movieId?: number;
}