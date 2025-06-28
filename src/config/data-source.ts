import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../app/categories/entities/category-entity";
import { Movie } from "../app/movies/entity/movie.entity";
import { User } from "../app/users/entity/user.entity";
import { UserMovie } from "../app/user-movies/entity/user-movie.entity";


export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [Category, Movie, User, UserMovie],
  
});
