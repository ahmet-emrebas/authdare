import { PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';


export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    constructor(values?: UpdateTicketDto) {
        super();
        Object.assign(this, values);
    }
}