import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn() created_at: string;
    @DeleteDateColumn() deleted_at: string;
    @UpdateDateColumn() updated_at: string;
}