import { InternalServerErrorException, Logger } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { getConnection } from 'typeorm';
import { Connection, ConnectionOptions } from 'typeorm';

export async function connectDB(connectionOptions: ConnectionOptions): Promise<Connection> {
    const TAG = 'Database:connectDB'
    try {
        return getConnection(connectionOptions.name);
    } catch (err) {
        Logger.error(err, TAG);
    }
    try {
        return await createConnection(connectionOptions)
    } catch (err) {
        Logger.error(err, TAG)
        throw new InternalServerErrorException('Could not connect the database!')
    }
}