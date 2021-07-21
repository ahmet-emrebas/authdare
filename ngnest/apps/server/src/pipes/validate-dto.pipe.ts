import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Validate and transform user inputs and transform it to the actual form.
 */
@Injectable()
export class ValidateDtoPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const instance = new metadata.metatype(value);
    const errors = await validate(instance);
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
    const transformed = classToClass(instance);
    return transformed;
  }
}
@Injectable()
export class ValidateManyDtoPipe implements PipeTransform {
  async transform(values: any[], metadata: ArgumentMetadata) {
    const transformeds = [];
    for (const e of values) {
      const instance = new metadata.metatype(e);

      const errors = await validate(instance);

      if (errors && errors.length > 0) {
        throw new UnprocessableEntityException(errors);
      }
      const transformed = classToClass(instance);
      transformeds.push(transformed);
    }
    return transformeds;
  }
}
