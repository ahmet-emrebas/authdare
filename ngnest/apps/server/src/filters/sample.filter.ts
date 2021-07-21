import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class SampleFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // TODO:
  }
}
