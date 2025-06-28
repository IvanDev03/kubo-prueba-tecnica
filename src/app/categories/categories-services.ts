import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { Category } from "./entities/category-entity";
import { PaginationDto } from "../utils/dto/pagination.dto";
import { PaginationService } from "../utils/pagination-service";


export class CategoriesService {
    private readonly categoryRepository: Repository<Category>;
    private readonly paginationService: PaginationService;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.paginationService = new PaginationService();
    }

     async getCategoriesPaginated(paginationDto:PaginationDto) {
            try {
                const { data, total } = await this.paginationService.paginate<Category>(
                    this.categoryRepository,
                    paginationDto,
                    ["movie"]
                );
                return {
                    data,
                    total,
                    page: paginationDto.page || 1,
                    limit: paginationDto.limit || 10
                };
            } catch (error) {
                console.error("Error fetching paginated movies:", error);
                throw new Error("Could not fetch paginated movies");
            }
        }

    async getCategories() {
        try {
            const categories = await this.categoryRepository.find({
                relations: {
                    movie: true
                }
            });
            return categories || [];
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Could not fetch categories");
        }
    }

    async createCategory(name: string) {
        try {
            const category = this.categoryRepository.create({ name });
            return await this.categoryRepository.save(category);
        } catch (error) {
            console.error("Error creating category:", error);
            throw new Error("Could not create category");
        }
    }

  

    
}