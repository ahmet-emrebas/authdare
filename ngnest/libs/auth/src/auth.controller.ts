import { ProviderTokens } from './provider-tokens';
import { AuthRoutes } from './auth-routes';
import { ResourceTypeTokens } from './decorators/resource-type-tokens';
import { UserService } from './user/user.service';
import { AuthGuard } from './guards/auth.guard';
import {
    Controller,
    Get,
    Logger,
    Session,
    UseGuards,
    Inject,
    InternalServerErrorException,
} from '@nestjs/common';
import { PublicPolicy } from './decorators';
import { SessionKeys } from './session-keys';
import { PermissionPolicy, ResourceType } from './decorators';
import { omit } from 'lodash';
import {
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeTokens.AUTH)
@Controller(AuthRoutes.BASE)
export class AuthController {
    // private readonly logger = new Logger(AuthController.name);
    // private readonly resourcePermissions: any[];
    // constructor(
    //     private readonly userService: UserService,
    //     @Inject(ProviderTokens.RESOURCE_PATHS)
    //     private readonly resourceNames: string[],
    // ) {
    //     this.resourcePermissions = this.resourceNames.map((e) => {
    //         return {
    //             name: e,
    //             permissions: {
    //                 get: `get:${e}`,
    //                 post: `post:${e}`,
    //                 patch: `patch:${e}`,
    //                 put: `put:${e}`,
    //                 delete: `delete:${e}`,
    //             },
    //         };
    //     });
    // }
    // /**
    //  * View profile
    //  * @param session
    //  * @returns
    //  */
    // @ApiUnauthorizedResponse({
    //     description: '(401) When user does not have a valid session.',
    // })
    // @ApiInternalServerErrorResponse({
    //     description: '(500) When server cannot operate for internal errors.',
    // })
    // @Get(AuthRoutes.PROFILE)
    // async viewOwnProfile(@Session() session: any) {
    //     try {
    //         const { orgname, email } = session[SessionKeys.USER];
    //         return omit(
    //             await this.userService.findOne({ where: { orgname, email } }),
    //             'password',
    //         );
    //     } catch (err) {
    //         throw new InternalServerErrorException();
    //     }
    // }
    // /**
    //  *
    //  * List of permissions, this resource requires post:users permissions because this resource is only for who is able to create/update user account.
    //  * @returns
    //  */
    // @ApiUnauthorizedResponse({
    //     description:
    //         '(401) When user does not have  "post:users" & "update:users" permission',
    // })
    // @ApiInternalServerErrorResponse({
    //     description: '(500+) When server cannot operate for internal errors.',
    // })
    // @ApiOkResponse({ description: '(200) When permission returns.' })
    // @PermissionPolicy('post:users')
    // @PublicPolicy()
    // @Get('permissions')
    // permissions() {
    //     return this.resourcePermissions;
    // }
}
