import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second (optional)

// *        *        *       * *     *	    every second
// 45       *        *       * *     *	    every minute, on the 45th second
// 0        10       *       * *     *	    every hour, at the start of the 10th minute
// 0        */30     9-17    * *     *	    every 30 minutes between 9am and 5pm
// 0        30       11      * *     1-5	Monday to Friday at 11:30am

@Injectable()
export class AuthCronService {
    private readonly logger = new Logger(AuthCronService.name);

    constructor(private eventEmitter: EventEmitter2) {}

    @Cron('30 * * * * *')
    handleCron() {
        this.logger.debug('Called when the current second is 45');
        this.eventEmitter.emit('cron.hello');
    }

    @Cron(CronExpression.EVERY_DAY_AT_6PM)
    report() {
        this.logger.log('Reporting');
    }
}
