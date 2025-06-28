
import { Router } from "express";
import { UsersController } from "./users-controller";


export default function userRoutes(app: Router) {
    const userController = new UsersController();

    app.get("/", (req, res) => userController.getUsers(req, res));
  
    app.post("/", (req, res, next) => {
        userController.createUser(req, res).catch(next);
    });
    app.get("/:userId/watched-movies", (req, res, next) => {
        userController.getMoviesWatchedByUser(req, res).catch(next);
    });
}