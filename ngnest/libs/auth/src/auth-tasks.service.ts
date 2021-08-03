import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'

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
export class AuthTasksService {
    private readonly logger = new Logger(AuthTasksService.name);

    @Cron('* 1 * * * *')
    handleCron() {
        this.logger.debug('Called when the current second is 45');
    }
}