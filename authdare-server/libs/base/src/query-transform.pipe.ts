import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';

/**
 * Transform query paramters, from the request, into the defined type like fields=a,b,c,d  to fields = [a,b,c,d]
 */
@Injectable()
export class QueryTransformPipe<T extends object = any>
  implements PipeTransform
{
  constructor(private readonly queryClass: ClassConstructor<T>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const queryClass = plainToClass(this.queryClass, value);
    return queryClass;
  }
}
