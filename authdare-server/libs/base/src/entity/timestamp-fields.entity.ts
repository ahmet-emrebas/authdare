import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Timestamp fields adn id field.
 */
export class TimestampFields {
    @PrimaryGeneratedColumn() id: number = undefined;
    @CreateDateColumn() created_at: string = undefined;
    @UpdateDateColumn() updated_at: string = undefined;
    @DeleteDateColumn() deleted_at: string = undefined;

}