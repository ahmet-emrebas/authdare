import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthUser {

    @PrimaryGeneratedColumn()
    id!: number;

}
