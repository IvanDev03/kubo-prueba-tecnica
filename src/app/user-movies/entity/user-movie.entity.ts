
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Unique } from "typeorm";
import { Movie } from "../../movies/entity/movie.entity";
import { User } from "../../users/entity/user.entity";

@Entity("user_movies")
@Unique(["user", "movie"])
export class UserMovie {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.userMovies)
    user!: User;

   @ManyToOne(() => Movie, movie => movie.userMovies)
    movie!: Movie;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ default: false })
    isWatched!: boolean;
}