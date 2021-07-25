import { QueryOptions } from './common/query-options';
import { BaseResourceService } from './services/base.resource-service';

import {
    Post,
    Body,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    Controller,
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

const ResouceService = createParamDecorator((__: any, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()['ResourceService'];
})

@ApiTags('ResourceController')
@Controller('')
export class ResourceController {

    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @Post(":organization/api/:resource")
    async create(@Body() creaetDto: any, @ResouceService() userService: BaseResourceService) {
        return await userService.save(creaetDto);
    }

    @ApiOkResponse()
    @Get()
    async findAll(@Query() query: QueryOptions<any>, @ResouceService() userService: BaseResourceService) {
        return await userService.find(query);
    }

    @ApiOkResponse()
    @Post('query')
    async findAllQuery(@Body() query: QueryOptions<any>, @ResouceService() userService: BaseResourceService) {
        return await userService.find(query);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    async findOne(@Param('id') id: string, @ResouceService() userService: BaseResourceService) {
        return await userService.find({ where: { id } });
    }

    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @ApiNotFoundResponse()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: any, @ResouceService() userService: BaseResourceService) {
        return await userService.update(id, updateDto);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Delete(':id')
    async remove(@Param('id') id: string, @ResouceService() userService: BaseResourceService) {
        return await userService.delete(id);
    }
}
