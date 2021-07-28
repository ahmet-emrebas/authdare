import { values, snakeCase, split, nth, last, first } from "lodash";

export interface Model<Entity = any, CreateDTO = any, UpdateDTO = any> {
    path: string;
    entity: Entity;
    create: Entity;
    update: Entity;
}

/**
 * Map models and dtos based on the name convention.
 * 
 * ````
 * class UserEntity{ className="UserEntity"}
 * class UpdateUserDTO{ className="UpdateUserDTO"}
 * class CreateUserDTO{ className="CreateUserDTO"}
 * ````
 * @param path 
 */
export async function getModelMap() {
    const models: { [key: string]: Partial<Model> } = {};
    const ms = await import("@authdare/models");
    for (let __m of values(ms)) {
        const m = __m as any;
        if (!m.className) continue;

        const arr0 = split(snakeCase(m.className), '_')
        const mtype = last(arr0) == 'dto' ? first(arr0) : last(arr0);
        const resourceName = nth(arr0, -2) + 's';
        models[resourceName] = models[resourceName] || {};
        models[resourceName][mtype] = m;
        models[resourceName].path = resourceName;
    }
    return models;
}