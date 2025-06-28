
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Category } from "../../categories/entities/category-entity";
import { UserMovie } from "../../user-movies/entity/user-movie.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: "date", nullable: false })
    relaseDate!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => Category, category => category.movie)
    category!: Category;

    @OneToMany(() => UserMovie, userMovie => userMovie.movie)
    userMovies!: UserMovie[];

}