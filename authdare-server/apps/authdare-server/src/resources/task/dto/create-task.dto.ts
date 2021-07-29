import { IsNotBlank } from "@authdare/utils";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Length } from "class-validator";

@Exclude()
export class CreateTaskDTO {

    @ApiProperty()
    @Expose()
    @Length(3, 50)
    @IsNotBlank()
    title: string;

    @ApiProperty()
    @Expose()
    @IsNotBlank()
    @Length(3, 400)
    description: string;

    constructor(obj: Partial<CreateTaskDTO>) {
        Object.assign(this, obj);
    }

}
