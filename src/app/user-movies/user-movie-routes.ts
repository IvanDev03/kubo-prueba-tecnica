
import { Router } from "express";
import { UserMovieController } from "./user-movie-controller";

export default function userMovieRoutes(app: Router) {
    const userMovieController = new UserMovieController();

    app.post("/check-watched-movie", (req, res, next) => {
        userMovieController.createUserMovie(req, res).catch(next);
    });
    app.get("/user-movies-watched-by-user/:userId", (req, res, next) => {
        userMovieController.getUserMoviesWatchedByUser(req, res).catch(next);
    });

}