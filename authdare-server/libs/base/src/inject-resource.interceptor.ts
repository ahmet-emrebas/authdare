import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { getResourceService } from './get-resource-service';
import { RESOURCE_SERVICE_KEY } from './get-resource-service.decorator';

/**
 * Inject the client database services upon request 
 * For example on GET api/users, UserService will be added to the context. 
 * Use the get-resouce-service-decorator to get the ResouceService. 
 * This interceptor is only for client resources! Not for us.
 */
@Injectable()
export class InjectResourceInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const resourcePath = (context.getClass() as any).path;
    const user = context.switchToHttp().getRequest().user;
    if (!user?.org?.name) {
      throw new UnauthorizedException(
        'We could not determine your organization!',
      );
    }

    /**
     * Injecting the resource service
     */
    context.switchToHttp().getRequest()[RESOURCE_SERVICE_KEY] = await getResourceService(resourcePath, user.org.name);

    return next.handle();
  }
}
