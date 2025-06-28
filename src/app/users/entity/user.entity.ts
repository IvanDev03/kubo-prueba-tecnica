import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Movie } from "../../movies/entity/movie.entity";
import { UserMovie } from "../../user-movies/entity/user-movie.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

   @OneToMany(() => UserMovie, userMovie => userMovie.user)
   userMovies!: UserMovie[];


   }