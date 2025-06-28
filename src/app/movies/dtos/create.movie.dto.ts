import { IsInt, IsString, Matches } from "class-validator";

export class CreateMovieDto {
    
    @IsString()
    title!: string;
    
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Release date must be in the format YYYY-MM-DD' })
    relaseDate!: string; 

    @IsInt({ message: 'Category ID must be an integer' })
    categoryId!: number;
}