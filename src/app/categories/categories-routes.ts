
import { Router } from "express";
import { CategoriesController } from "./categories-controllers";

export default function categoriesRoutes(app: Router) {
    const categoriesController = new CategoriesController();

    app.get("/", (req, res) => categoriesController.getCategories(req, res));
    app.get("/paginated", (req, res, next) => {
        categoriesController.getCategoriesPaginated(req, res).catch(next);
    });
    app.post("/", (req, res, next) => {
        categoriesController.createCategory(req, res).catch(next);
    });
}