import { ApiTags } from '@nestjs/swagger';
import { ResourceController } from './resource.controller';
import { SubscriberEntity } from '../models/user';
import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ApiTags(SubscribersController.name)
@Controller('authdare/subscribers')
export class SubscribersController extends ResourceController {
    constructor(
        @InjectRepository(SubscriberEntity) private readonly userRepo: Repository<SubscriberEntity>,
    ) {
        super(userRepo);
    }
}
