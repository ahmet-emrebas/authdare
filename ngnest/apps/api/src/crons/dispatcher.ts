import { EventService } from '@authdare/event';
import { LogService } from '@authdare/log';
import { MailService } from '@authdare/mail';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventCronService {
    constructor(
        private readonly mail: MailService,
        private readonly event: EventService,
        private readonly logger: LogService,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async anyNewEvents() {}

    @Cron(CronExpression.EVERY_SECOND)
    async mailJobs() {}
}
