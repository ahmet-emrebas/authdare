import { Repository } from 'typeorm';
import { CreateTicketDto, Ticket, UpdateTicketDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketService extends BaseResourceService<
  Ticket,
  CreateTicketDto,
  UpdateTicketDto
> {
  constructor(@InjectRepository(Ticket) ticketRepo: Repository<Ticket>) {
    super(ticketRepo, CreateTicketDto, UpdateTicketDto);
  }
}
