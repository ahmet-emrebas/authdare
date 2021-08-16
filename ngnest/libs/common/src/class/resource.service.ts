import { flatten } from 'lodash';
import {
    InternalServerErrorException,
    Logger,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { CommonConstructor, CommonEntity } from '@authdare/common/class';
import { validate, ValidatorOptions } from 'class-validator';
import { Repository } from 'typeorm';
import { ValidationGroups } from './dto-validation-groups';
import { toErrorMessages } from '../decorator';
import { LogService } from '@authdare/log';
import { toILikeExactAny, toORILikeContains } from '../util/find-queries';

/**
 * Resource Service Impemation.
 */
export class ResourceService<T extends CommonConstructor<T>> {
    private __logger!: Logger;
    private __uniqueFields!: string[];
    private __requiredFields!: string[];
    private __repoName!: string;

    constructor(
        protected readonly repo: Repository<CommonEntity<T>>,
        protected readonly logService?: LogService,
    ) {
        const { name, uniques } = repo.metadata;

        this.__repoName = name;

        // Unique fields of the entity
        this.__uniqueFields = flatten(uniques.map((e) => e.givenColumnNames) as any) as any;

        // Fallback logger
        this.__logger = new Logger(this.__repoName + ' service');
    }

    private __error(err: any) {
        setTimeout(async () => {
            if (this.logService) {
                await this.logService?.error(err.message || err);
            } else {
                this.__logger.error(err.message || err);
            }
        }, 10);
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
            this.__error(err);
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
            this.__error(err);
            throw new NotAcceptableException(err.message);
        }
    }

    async save(body: T) {
        const instance = await this.__validate(body);
        let saved;
        try {
            saved = (await this.repo.save(instance)) as any as CommonEntity<T>;
        } catch (err: any) {
            this.__error(err);
            throw new NotAcceptableException(`${err.message}`);
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
            await this.__updateQueryString(id);
            return updated;
        } catch (err: any) {
            this.__error(err);
            throw new NotAcceptableException('Could not update the entity for unknown reason!');
        }
    }

    async delete(id: number) {
        const found = await this.repo.findOne(id);
        if (found) {
            try {
                return await this.repo.softDelete(id);
            } catch (err: any) {
                this.__error(err);
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
     * @param saved id or saved instance
     */
    private __updateQueryString(saved: CommonEntity<T> | number) {
        setTimeout(async () => {
            if (typeof saved == 'number') {
                const _saved = await this.repo.findOne(saved);
                if (_saved) await this.__updateQueryString(_saved);
            } else {
                try {
                    await this.repo.update(saved.id!, {
                        string: CommonEntity.toQueryString(saved),
                    } as any);
                } catch (err: any) {
                    this.__error(err);
                }
            }
        });
    }
}
