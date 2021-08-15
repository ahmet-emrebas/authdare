import { flatten, keys, pick } from 'lodash';
import {
    InternalServerErrorException,
    Logger,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { CommonConstructor, CommonEntity } from '@authdare/common/class';
import { validate, ValidatorOptions } from 'class-validator';
import { ILike, Repository } from 'typeorm';
import { ValidationGroups } from './dto-validation-groups';
import { toErrorMessages } from '../decorator';
import { LogService } from '@authdare/log';
import { toILikeExactAny, toORILikeContains } from '../util/find-queries';

/**
 * Resource Service Impemation.
 */
export class ResourceService<T extends CommonConstructor<T>> {
    protected uniqueFields!: string[];
    protected requiredFields!: string[];

    constructor(
        protected readonly repo: Repository<CommonEntity<T>>,
        protected readonly logService?: LogService,
    ) {
        const { name, uniques } = repo.metadata;
        this.uniqueFields = flatten(uniques.map((e) => e.givenColumnNames) as any) as any;
        /**
         * Log service is optional.
         * Check the logservice is injected or not.
         */
        if (!logService) {
            console.warn(
                `Peristent log service is not injected! If it is intentianal ignore this message.`,
            );
        }
    }

    async isExist(query: string) {
        const exactMatchQuery = query ? toILikeExactAny(query) : {};
        return await this.repo.findOne({ where: { string: exactMatchQuery } });
    }

    async query(query?: string) {
        const likeQuery = query ? toORILikeContains(query) : {};
        try {
            return await this.repo.find({ take: 20, where: likeQuery });
        } catch (err: any) {
            await this.logService?.error(err.message);
            throw new InternalServerErrorException();
        }
    }

    async find(query?: Record<string, any>) {
        const page = query?.page > 0 ? query?.page : 1;
        const take = 20;
        const skip = (page - 1) * 20;
        try {
            const count = await this.repo.count();
            if (count > 0) return await this.repo.find({ take, skip });
            else return [];
        } catch (err: any) {
            throw new NotAcceptableException(err.message);
        }
    }

    async save(body: T) {
        const instance = await this.__validate(body);

        if (this.uniqueFields && this.uniqueFields.length > 0) {
            /**
             * Getting unique fields to check there is any value match in database
             */
            const fields = pick(instance, ...this.uniqueFields);
            const uniqueFieldsQuery = CommonEntity.toQueryString(fields);

            /**
             * Found items by unique fields query.
             */
            const foundSames =
                uniqueFieldsQuery.length > 3 && (await this.query(uniqueFieldsQuery));

            /**
             * If found any data with the uniqueFieldQuery, then it means we CANNOT save the same data again becuase they are unique fields.
             */
            if (foundSames && foundSames.length > 0) {
                const messages = keys(pick(foundSames[0], ...this.uniqueFields)).map(
                    (propertyKey) => {
                        return `${propertyKey} field is already token. Please, use different ${propertyKey}.`;
                    },
                );
                console.error(messages);
                throw new NotAcceptableException(messages);
            }
        }

        let saved;
        try {
            saved = (await this.repo.save(instance)) as any as CommonEntity<T>;
        } catch (err: any) {
            console.error(err);
            try {
                await this.logService?.error('!!!!!!!!!!');
            } catch (err) {
                console.error(err);
            }
            throw new NotAcceptableException('Could not save the entity for unknown reason!');
        }
        await this.__updateQueryString(saved);
        return saved;
    }

    async update(id: number, __updated: T) {
        const validatedInstance = await this.__validate(__updated, {
            groups: [ValidationGroups.UPDATE],
        });
        try {
            const updated = await this.repo.update(id, validatedInstance);
            const found = await this.repo.findOne(id);
            await this.__updateQueryString(found as any);
            return updated;
        } catch (err: any) {
            await this.logService?.save(err);
            throw new NotAcceptableException('Could not update the entity for unknown reason!');
        }
    }

    async delete(id: number) {
        const found = await this.repo.findOne(id);

        if (found) {
            try {
                return await this.repo.softDelete(id);
            } catch (err: any) {
                await this.logService?.save(err);
                throw new NotAcceptableException('Could not delete the item for unknown reason!');
            }
        }

        throw new NotFoundException(`Item with id ${id} not found.`);
    }

    /**
     * Add the ValidationGroups.UPDATE for optional fields during update so we can use single DTO with both update and create operation.
     * @param obj
     * @param validatioOptions
     * @returns
     */
    private async __validate(
        obj: T,
        validatioOptions?: ValidatorOptions,
    ): Promise<CommonEntity<T>> | never {
        const instance = this.repo.create(obj);
        const errors = await validate(instance, validatioOptions);

        if (errors && errors.length > 0) {
            throw new NotAcceptableException(toErrorMessages(errors));
        }

        return instance;
    }

    /**
     * Update query-string.
     * @param saved
     */
    private async __updateQueryString(saved: CommonEntity<T>): Promise<void> {
        try {
            await this.repo.update(saved.id!, { string: CommonEntity.toQueryString(saved) } as any);
        } catch (err: any) {
            await this.logService?.save(err);
        }
    }
}
