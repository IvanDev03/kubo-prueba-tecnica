
import { Router } from "express";
import { MoviesController } from "./movies-controller";

export default function moviesRoutes(app: Router) {
    const moviesController = new MoviesController();

    app.get("/", (req, res) => moviesController.getMovies(req, res));
    app.get("/news", (req, res) => moviesController.getNews(req, res));
    app.get("/paginated", (req, res, next) => {
        moviesController.getMoviesPaginated(req, res).catch(next);
    });
    app.post("/", (req, res, next) => {
        moviesController.createMovie(req, res).catch(next);
    });
}