
import { Request, Response } from "express";
import { UserService } from "./user-service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDto } from "./dtos/create.user.dto";

export class UsersController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users" });
        }
    }
    async createUser(req: Request, res: Response) {
        
        const dto = plainToInstance(CreateUserDto, req.body);
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
            const newUser = await this.userService.createUser(name);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error creating user" });
        }
    }
    async getMoviesWatchedByUser(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        try {
            const movies = await this.userService.getMoviesWatchedByUser(userId);
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: "Error fetching movies watched by user" });
        }
    }
}