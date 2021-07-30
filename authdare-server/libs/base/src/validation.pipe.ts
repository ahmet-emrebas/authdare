import { validate } from 'class-validator';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";



@Injectable()
export class ValidationPipe<T extends object = any> implements PipeTransform {
    constructor(private readonly entityDTO: ClassConstructor<T>) { }
    async transform(value: Partial<T>, metadata: ArgumentMetadata) {
        const dtoClassInstance = plainToClass(this.entityDTO, value)
        const errors = await validate(dtoClassInstance);
        if (errors && errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return dtoClassInstance;
    }
}




