import { Controller, Get, UseGuards, UseInterceptors, Query, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    GetResourceService, InjectResourceInterceptor, BaseResourceService, QueryOptions, ToQueryOptionsPipe
} from '@authdare/base';
import { AuthGuard } from '@authdare/auth';
import { CreateUserDTO, UpdateUserDTO, UserEntity } from '@authdare/models';

@ApiTags("Client" + UserResourceController.name)
@UseGuards(AuthGuard)
@UseInterceptors(InjectResourceInterceptor)
@Controller("users")
export class UserResourceController {
    static readonly className = 'UserResourceController'
    static readonly path = 'users';
    @Get()
    async find(
        @Query(ToQueryOptionsPipe) query: QueryOptions<UserEntity>,
        @GetResourceService() resourceService: BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>
    ) {
        return await resourceService.find(query)
    }

    @Get(":id")
    async fingById(
        @Param("id") id: number,
        @GetResourceService() resourceService: BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>
    ) {
        return await resourceService.findByIds(id);
    }

    @Post('query')
    async query(
        @Body() queryOptions: QueryOptions<UserEntity>,
        @GetResourceService() resourceService: BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>
    ) {
        return await resourceService.find(queryOptions);
    }

    @Post()
    async create(
        @Body() body: CreateUserDTO,
        @GetResourceService() resourceService: BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>
    ) {
        return await resourceService.create(body);
    }

    @Patch(":id")
    async update(
        @Param("id") id: number,
        @Body() body: UpdateUserDTO,
        @GetResourceService() resourceService: BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>
    ) {
        return await resourceService.update(id, body);
    }

    @Delete(":id/:hard")
    async delete(
        @Param("id") id: number,
        @Param("hard") hard: boolean,
        @GetResourceService() resourceService: BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>
    ) {
        if (hard == true)
            return await resourceService.deleteHard(id);
        return await resourceService.softDelete(id);
    }

}

