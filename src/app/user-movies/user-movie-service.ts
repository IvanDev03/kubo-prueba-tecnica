
import { AppDataSource } from "../../config/data-source";
import { Movie } from "../movies/entity/movie.entity";
import { User } from "../users/entity/user.entity";
import { CreateUserMovieDto } from "./dto/create-user-movie.dto";
import { UserMovie } from "./entity/user-movie.entity";
import { Repository } from "typeorm";

export class UserMovieService {
    private readonly userMovieRepository: Repository<UserMovie>;
    private readonly userRepository: Repository<User>;
    private readonly movieRepository: Repository<Movie>;

    constructor() {
        this.userMovieRepository = AppDataSource.getRepository(UserMovie);
        this.userRepository = AppDataSource.getRepository(User);
        this.movieRepository = AppDataSource.getRepository(Movie);
    }

    async createUserMovie(dto: CreateUserMovieDto) {
        const { userId, movieId } = dto;
        try {
            if (!userId || !movieId) {
                throw new Error("User ID and Movie ID are required");
            }
            const user = await this.userRepository.findOneBy({ id: userId });
            const movie = await this.movieRepository.findOneBy({ id: movieId });

            if (!user || !movie) {
                throw new Error("User or Movie not found");
            }

            const userMovie = this.userMovieRepository.create({
                user,
                movie,
                isWatched: true
            });
            return await this.userMovieRepository.save(userMovie);
        } catch (error) {
            console.error("Error creating user movie:", error);
            throw new Error("Could not create user movie");
        }
    }

    async getUserMoviesWatchedByUser(userId: number) {
        try {
            const userMovies = await this.userMovieRepository.find({
                where: { user: { id: userId } },
                relations: ["user", "movie"],
                select: {
                    user: {
                        id: true,
                        name: true
                    },
                    movie: {
                        id: true,
                        title: true,
                        relaseDate: true
                    },
                    isWatched: true
                }
            });
            return userMovies;
        } catch (error) {
            console.error("Error fetching user movies:", error);
            throw new Error("Could not fetch user movies");
        }
    }

}