import { QueryOptions } from './../../core/src/controller/query-options';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto, Ticket } from '@authdare/models';
import {
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Controller,
  Logger,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('TicketController')
@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) { }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateTicketDto) {
    try {
      return await this.ticketService.save(creaetDto);
    } catch (err) {
      Logger.error(err, TicketController.name);
      return err;
    }
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: QueryOptions<Ticket>) {
    try {
      return await this.ticketService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: QueryOptions<Ticket>) {
    try {
      return await this.ticketService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.ticketService.find({ where: { id } });
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTicketDto) {
    try {
      return await this.ticketService.update(id, updateDto);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.ticketService.delete(id);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }
}
