import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventCronService {
    constructor() // private readonly event: EventService, // private readonly mail: MailService,
    // private readonly logger: LogService,
    {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async anyNewEvents() {}

    @Cron(CronExpression.EVERY_SECOND)
    async mailJobs() {}
}
