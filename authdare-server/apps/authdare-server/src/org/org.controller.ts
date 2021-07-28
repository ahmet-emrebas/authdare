import { Controller, Get, Query, Param, Body, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryOptions, ToQueryOptionsPipe } from '@authdare/base';
import { UpdateOrgDTO, CreateOrgDTO } from './dto';
import { OrgEntity } from './entity';
import { OrgService } from './org.service';


@ApiTags(OrgController.name)
@Controller('orgs')
export class OrgController {
  constructor(private readonly orgService: OrgService) { }
  @Get()
  async find(@Query(ToQueryOptionsPipe) query: QueryOptions<OrgEntity>) {
    console.log(query);
    return await this.orgService.find(query)
  }

  @Get(":id")
  async fingById(@Param("id") id: number) {
    return await this.orgService.findByIds(id);
  }

  @Post('query')
  async query(@Body() queryOptions: QueryOptions<OrgEntity>) {
    return await this.orgService.find(queryOptions);
  }

  @Post()
  async create(@Body() body: CreateOrgDTO) {
    return await this.orgService.create(body);
  }


  @Patch(":id")
  async update(@Param("id") id: number, @Body() body: UpdateOrgDTO,) {
    return await this.orgService.update(id, body);
  }


  @Delete(":id/:hard")
  async delete(@Param("id") id: number, @Param("hard") hard: boolean) {
    if (hard == true)
      return await this.orgService.deleteHard(id);

    return await this.orgService.softDelete(id);
  }
}
