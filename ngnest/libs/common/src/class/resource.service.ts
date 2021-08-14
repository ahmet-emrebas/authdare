import { flatten, keys, pick, pickBy, values } from 'lodash';
import { Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CommonConstructor, CommonEntity } from '@authdare/common/class';
import { validate, ValidatorOptions } from 'class-validator';
import { ILike, Repository } from 'typeorm';
import { ConfigService } from '@authdare/config';
import { ValidationGroups } from './dto-validation-groups';

/**
 * Resource Service Impemation.
 */
export class ResourceService<T extends CommonConstructor<T>> {
    protected readonly logger!: Logger;
    constructor(
        protected readonly repo: Repository<CommonEntity<T>>,
        protected readonly uniqueFields?: string[],
    ) {
        this.logger = new Logger([repo.metadata.name, ResourceService.name].join('.'));
    }

    async query(query: string) {
        const likeQuery = query.split('&').map((e) => ({ string: ILike(`%${e}%`) }));
        return await this.repo.find({ take: 20, where: likeQuery });
    }

    async find(query: Record<string, any>) {
        const page = query.page || 20;
        const take = 20;
        const skip = (page - 1) * 20;
        try {
            return await this.repo.find({ take, skip });
        } catch (err: any) {
            this.logger.error(err.messgae);
            throw new NotAcceptableException(err.message);
        }
    }

    async save(body: T) {
        const instance = await this.__validate(body);

        if (this.uniqueFields && this.uniqueFields.length > 0) {
            const fields = pick(instance, this.uniqueFields);
            const queryString = instance.toQueryString(fields);
            const foundSame = await this.query(queryString);
            if (foundSame && foundSame.length > 0) {
                const messages = keys(pick(foundSame, this.uniqueFields)).map((propertyKey) => {
                    return `${propertyKey} is not acceptable. Please try something else.`;
                });
                throw new NotAcceptableException(messages);
            }
        }

        let saved;
        try {
            saved = (await this.repo.save(instance)) as any as CommonEntity<T>;
        } catch (err) {
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
        } catch (err) {
            this.logger.error(err);
            throw new NotAcceptableException('Could not update the entity for unknown reason!');
        }
    }

    async delete(id: number) {
        const found = await this.repo.findOne(id);

        if (found) {
            try {
                return await this.repo.softDelete(id);
            } catch (err: any) {
                this.logger.error(err.message);
                throw new NotAcceptableException('Could not delete the item for unknown reason!');
            }
        }

        throw new NotFoundException(`There is no entity in database with the id ${id}`);
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
            throw new NotAcceptableException(flatten(errors.map((e) => values(e.constraints))));
        }

        return instance;
    }

    /**
     * Update query-string.
     * @param saved
     */
    private async __updateQueryString(saved: CommonEntity<T>): Promise<void> {
        try {
            await this.repo.update(saved.id!, { string: saved.toQueryString() } as any);
        } catch (err) {
            this.logger.error(
                `Could not update the query string for some reason. Here is the problem`,
            );
            console.error(err);
        }
    }
}
