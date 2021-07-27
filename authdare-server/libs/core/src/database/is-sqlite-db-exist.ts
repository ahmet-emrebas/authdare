import { join } from 'path';
import { existsSync } from "fs";

export function isSQLiteDBExist(name: string) {
    return existsSync(join(process.cwd(), 'database', name, '.sqlite'))
}