import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Router } from "express";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./app/users/user-routes";
import moviesRoutes from "./app/movies/movies-routes";
import categoriesRoutes from "./app/categories/categories-routes";
import userMovieRoutes from "./app/user-movies/user-movie-routes";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado a la base de datos");

    app.get("/", (req, res) => {
      res.send("¡Hola, mundo! 🌍");
    });

    const router = Router();
    userRoutes(router);
    app.use("/api/users", router);

    const moviesRouter = Router();
    moviesRoutes(moviesRouter);
    app.use("/api/movies", moviesRouter);

    const categoriesRouter = Router();
    categoriesRoutes(categoriesRouter);
    app.use("/api/categories", categoriesRouter);

    const userMovieRouter = Router();
    userMovieRoutes(userMovieRouter);
    app.use("/api/user-movies", userMovieRouter);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos", err);
  });
