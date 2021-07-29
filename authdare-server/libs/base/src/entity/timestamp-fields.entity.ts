import { Expose } from "class-transformer";
import { IsOptional } from "class-validator";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Timestamp fields will be used both EntityClass and DtoClass.
 */
export class TimestampFields {

    @PrimaryGeneratedColumn()
    @Expose()
    @IsOptional()
    id?: number

    @CreateDateColumn({
        transformer: {
            from: (value) => value && new Date(value).toLocaleString(),
            to: (value) => value
        }
    })
    @Expose()
    @IsOptional()
    created_at?: string;

    @UpdateDateColumn({
        transformer: {
            from: (value) => value && new Date(value).toLocaleString(),
            to: (value) => value
        }
    })
    @Expose()
    @IsOptional()
    updated_at?: string;

    @DeleteDateColumn({
        transformer: {
            from: (value) => value && new Date(value).toLocaleString(),
            to: (value) => value
        }
    })
    @Expose()
    @IsOptional()
    deleted_at?: string;

}