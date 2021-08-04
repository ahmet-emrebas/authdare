import { values, snakeCase, split, nth, last, first } from 'lodash';

export interface Model<Entity = any, CreateDTO = any, UpdateDTO = any> {
    path: string;
    entity: Entity;
    create: CreateDTO;
    update: UpdateDTO;
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
export async function getModels(): Promise<{ [key: string]: Model }> {
    const models: { [key: string]: Model } = {};
    const ms = await import('@authdare/resources');
    for (const __m of values(ms)) {
        const m = __m as any;
        if (!m.className) continue;

        const arr0 = split(snakeCase(m.className), '_');
        const mtype: string = (last(arr0) == 'dto' ? first(arr0) : last(arr0)) as string;
        const resourceName = nth(arr0, -2) + 's';
        models[resourceName] = models[resourceName] || {};
        (models as any)[resourceName][mtype] = m;
        models[resourceName].path = resourceName;
    }
    return models;
}




export interface Resource<Module = any, Controller = any> {
    path: string;
    controller: Controller;
    module: Module;
}

/**
 * Map modules and controllers based on the name convention.
 *
 * ````
 * class UserResourceController{ className="UserResourceController"}
 * class UserResourceModule{ className="UserResourceModule"}
 * ````
 * @param path
 */
export async function getModuleItems() {
    const modules: { [key: string]: Partial<Resource> } = {};
    const ms = await import('@authdare/resources');
    for (const __m of values(ms)) {
        const m = __m as any;
        if (!m.className) continue;

        const arr0 = split(snakeCase(m.className), '_');
        const mtype = last(arr0)!;
        const resourceName = first(arr0) + 's';
        modules[resourceName] = modules[resourceName] || {};
        (modules as any)[resourceName][mtype] = m;
        modules[resourceName].path = resourceName;
    }
    return modules;
}