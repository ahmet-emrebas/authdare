import { waitFor } from '@authdare/common/util';
import { EventEntity, EventService } from '@authdare/event';
import { LogEntity, LogService } from '@authdare/log';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventCronService {
    private logger = new Logger(EventCronService.name);
    private readonly eventPool: EventEntity[] = [];
    constructor(
        private readonly eventService: EventService,
        private readonly logService: LogService,
    ) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async anyNewEvents() {
        if (this.eventPool.length == 0) {
            this.logger.warn('Getting new jobs.');
            try {
                const foundEvents = await this.eventService.query();
                if (foundEvents && foundEvents.length > 0) this.eventPool.push(...foundEvents);
            } catch (err: any) {
                this.logger.error(err.message);
            }
        } else {
            return;
        }

        await this.logService.save({
            message: `Started handling events in pool of ${this.eventPool.length}`,
            code: 200,
            target: EventCronService.name,
        });

        this.logger.log(`Started handling events in pool of ${this.eventPool.length}.`);

        const len = this.eventPool.length;

        for (let i = 0; i < len; i++) {
            const c = this.eventPool.shift();
            if (!c) return;
            await waitFor(1000);
            try {
                await this.eventService.delete(c.id!);
            } catch (err: any) {
                this.logger.error(err.message);
            }
            console.log(`Handled the event ${c.id}`);
        }
    }
}
