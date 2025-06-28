
import { Request, Response } from "express";
import { UserMovieService } from "./user-movie-service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserMovieDto } from "./dto/create-user-movie.dto";

export class UserMovieController {
    private userMovieService: UserMovieService;

    constructor() {
        this.userMovieService = new UserMovieService();
    }

    async createUserMovie(req: Request, res: Response) {
        const dto = plainToInstance(CreateUserMovieDto, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Errores de validación",
                errors: errors.map((e) => ({
                    property: e.property,
                    constraints: e.constraints,
                })),
            });
        }
        try {
            const { userId, movieId } = req.body;
            if (!userId || !movieId) {
                return res.status(400).json({ message: "UserId or MovieId is required" });
            }
            const newUserMovie = await this.userMovieService.createUserMovie(dto);
            res.status(201).json(newUserMovie);
        } catch (error) {
            res.status(500).json({ message: "Error creating user movie" });
        }
    }
    async getUserMoviesWatchedByUser(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        try {
            const userMovies = await this.userMovieService.getUserMoviesWatchedByUser(userId);
            res.status(200).json(userMovies);
        } catch (error) {
            res.status(500).json({ message: "Error fetching user movies" });
        }
    }
}