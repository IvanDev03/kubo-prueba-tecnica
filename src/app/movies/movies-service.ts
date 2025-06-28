
import { AppDataSource } from "../../config/data-source";
import { getThreeWeeksAgoFormatted } from "../utils/date-helper";
import { PaginationDto } from "../utils/dto/pagination.dto";
import { PaginationService } from "../utils/pagination-service";
import { Movie } from "./entity/movie.entity";
import { Repository } from "typeorm";

export class MovieService {
    private readonly movieRepository: Repository<Movie>;
    private readonly paginationService: PaginationService;

    constructor() {
        this.movieRepository = AppDataSource.getRepository(Movie);
        this.paginationService = new PaginationService();
    }

    async getMoviesPaginated(paginationDto: PaginationDto) {
        try {
            const { data, total } = await this.paginationService.paginate<Movie>(
                this.movieRepository,
                paginationDto,
                ["category"]
            );
            return {
                data,
                total,
                page: paginationDto.page || 1,
                limit: paginationDto.limit || 10,
            };
        } catch (error) {
            console.error("Error fetching paginated movies:", error);
            throw new Error("Could not fetch paginated movies");
        }
    }

    async getMovies() {
        try {
            const movies = await this.movieRepository.find({
                relations: {
                    category: true
                }
            });
            return movies || [];
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw new Error("Could not fetch movies");
        }
    }

    async createMovie(title: string, categoryId: number, relaseDate: string) {
        try {
            const movie = this.movieRepository.create({ title, relaseDate, category: { id: categoryId } });
            return await this.movieRepository.save(movie);
        } catch (error) {
            console.error("Error creating movie:", error);
            throw new Error("Could not create movie");
        }
    }

    async getNews() {
        try {
            const threeWeeksAgo = getThreeWeeksAgoFormatted();
            const today = new Date().toISOString().split("T")[0];
            const news = await this.movieRepository.
            createQueryBuilder("movie")
            .where("movie.relaseDate BETWEEN :threeWeeksAgo AND :today", { threeWeeksAgo, today })
            .getMany();
            return news || [];
        }
        catch (error) {
            console.error("Error fetching news:", error);
            throw new Error("Could not fetch news");
        }

    }
}