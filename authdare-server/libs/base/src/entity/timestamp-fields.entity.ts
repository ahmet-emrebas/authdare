import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Timestamp fields adn id field.
 */
export class TimestampFields {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn({
        transformer: {
            from: (value) => value && new Date(value).toLocaleString(),
            to: (value) => value
        }
    })
    created_at: string;

    @UpdateDateColumn({
        transformer: {
            from: (value) => value && new Date(value).toLocaleString(),
            to: (value) => value
        }
    })
    updated_at: string;

    @DeleteDateColumn({
        transformer: {
            from: (value) => value && new Date(value).toLocaleString(),
            to: (value) => value
        }
    })
    deleted_at: string;

}