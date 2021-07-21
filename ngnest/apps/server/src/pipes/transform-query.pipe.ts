import { FindManyQuery } from '@base';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { isNotEmpty, validate } from 'class-validator';
import { pickBy } from 'lodash';

const validateDTO = async (instance) => {
  const errors = await validate(instance, {
    skipMissingProperties: true,
  });

  if (errors && errors.length > 0) {
    throw new BadRequestException(errors);
  }
};
@Injectable()
export class TransformQueryPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const queryInstance = new FindManyQuery(value);

    const dtoInstance = new metadata.metatype(value);

    const dtoInstanceSafe = pickBy(classToClass(dtoInstance), isNotEmpty);
    queryInstance.where = dtoInstanceSafe;

    await validateDTO(queryInstance);
    await validateDTO(dtoInstance);

    const transformedQueryInstance = pickBy(
      classToClass(queryInstance),
      isNotEmpty,
    );
    return transformedQueryInstance;
  }
}
