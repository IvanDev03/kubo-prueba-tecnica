import { AppDataSource } from "../../config/data-source";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getUsers() {
        try {
            const users = await this.userRepository.find({
                relations: {
                    userMovies: {
                        movie: true
                    }
                }
            });
            return users || [];
        } catch (error) {   
            console.error("Error fetching users:", error);
            throw new Error("Could not fetch users");
        }
    }

    async createUser(name: string) {
        try {
            const user = this.userRepository.create({ name });
            return await this.userRepository.save(user);
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Could not create user");
        }
    }

    async getMoviesWatchedByUser(userId: number) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: {
                    userMovies: {
                        movie: true
                    }
                }
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user.userMovies.map(userMovie => ({
                movieId: userMovie.movie.id,
                title: userMovie.movie.title,
                relaseDate: userMovie.movie.relaseDate,
                isWatched: userMovie.isWatched
            }));
        } catch (error) {
            console.error("Error fetching movies watched by user:", error);
            throw new Error("Could not fetch movies watched by user");
        }
    }
}


