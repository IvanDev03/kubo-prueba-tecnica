
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Movie } from "../../movies/entity/movie.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Movie, movie => movie.category)
    movie?: Movie;
}