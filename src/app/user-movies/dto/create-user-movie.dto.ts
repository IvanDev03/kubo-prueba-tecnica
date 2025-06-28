import { IsInt, IsBoolean, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserMovieDto {
    @Type(() => Number)
    @IsInt()
    userId!: number;

    @Type(() => Number)
    @IsInt()
    movieId!: number;

    @IsBoolean()
    @IsOptional()
    isWatched?: boolean;
}