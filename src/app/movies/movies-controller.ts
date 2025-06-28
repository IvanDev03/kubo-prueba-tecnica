import { Request, Response } from "express";
import { MovieService } from "./movies-service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateMovieDto } from "./dtos/create.movie.dto";
import { PaginationDto } from "../utils/dto/pagination.dto";

export class MoviesController {
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    async getMoviesPaginated(req: Request, res: Response) {
        const filters: Record<string, string> = {};
        const allowedParams = ["title", "relaseDate", "category.name"]; 
        Object.keys(req.query).forEach((key) => {
            if (allowedParams.includes(key)) {
                filters[key] = String(req.query[key]);
            }
        });
        const paginationDto = plainToInstance(PaginationDto, {
            ...req.query,
            filters,
        });
        const errors = await validate(paginationDto);
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
            const movies = await this.movieService.getMoviesPaginated(paginationDto);
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: "Error fetching movies" });
        }
    }

    async getNews(req: Request, res: Response) {
        try {
            const news = await this.movieService.getNews();
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ message: "Error fetching news" });
        }
    }


    async getMovies(req: Request, res: Response) {
        try {
            const movies = await this.movieService.getMovies();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: "Error fetching movies" });
        }
    }

    async createMovie(req: Request, res: Response) {
        const dto = plainToInstance(CreateMovieDto, req.body);
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
            const { title, relaseDate, categoryId } = req.body;
            if (!title) {
                return res.status(400).json({ message: "Title is required" });
            }
            const newMovie = await this.movieService.createMovie(title, categoryId, relaseDate);
            res.status(201).json(newMovie);
        } catch (error) {
            res.status(500).json({ message: "Error creating movie" });
        }
    }
}