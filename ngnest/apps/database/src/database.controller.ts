import { waitFor } from '@authdare/common/util';
import { getConnection } from 'typeorm';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';
import { t } from '@authdare/common/type';

@ApiTags(DatabaseController.name)
@Controller('dba')
export class DatabaseController {
    private readonly logger = new Logger(DatabaseController.name);
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('prune-all-databases')
    async delete() {
        const con = getConnection();
        for (const d of await this.databaseService.databases()) {
            await waitFor(1000);
            await con.query(`DROP DATABASE ${d};`);
            this.logger.log(`Deleted database ${d}`);
        }
    }

    @Get('signup/:orgname')
    async signup(@Param('orgname') orgname: string) {
        let name = t<string>();
        if (orgname) {
            name = await this.databaseService.createDatabase(orgname);
        }
        return name;
    }
}
