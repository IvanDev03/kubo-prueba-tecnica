
import { Request, Response } from "express";
import { CategoriesService } from "./categories-services";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { PaginationDto } from "../utils/dto/pagination.dto";
import { CreateCategoryDto } from "./dtos/create-category.dto";

export class CategoriesController {
    private categoriesService: CategoriesService;

    constructor() {
        this.categoriesService = new CategoriesService();
    }

    async getCategoriesPaginated(req: Request, res: Response) {
        const paginationDto = plainToInstance(PaginationDto, req.query);
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
            const categories = await this.categoriesService.getCategoriesPaginated(paginationDto);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Error fetching categories" });
            console.error(error);
        }
    }
    async getCategories(req: Request, res: Response) {
        try {
            const categories = await this.categoriesService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Error fetching categories" });
        }
    }
   async createCategory(req: Request, res: Response) {
        const dto = plainToInstance(CreateCategoryDto, req.body);
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
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }
            const newCategory = await this.categoriesService.createCategory(name);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: "Error creating category" });
        }
    }
}   