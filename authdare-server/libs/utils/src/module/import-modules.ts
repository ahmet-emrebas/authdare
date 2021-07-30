import { snakeCase, keys, split, lowerCase, last, nth, values } from 'lodash';

export type ModuleNameType<T = any> = {
    name: string;
    module: T;
    entity: any;
    create: any;
    update: any;
    query: any;
    read: any;
    service: any;
    controller: any;
}

/**
 * First index from end of the item should be the type of the item. Second index from end should be the name of the resource. 
 */
export async function importResourceModules(): Promise<Partial<ModuleNameType>[]> {

    const modules: { [key: string]: Partial<ModuleNameType> } = {}
    const resources = await import('@authdare/resources');

    for (let resourceLongName of keys(resources)) {
        const names = split(snakeCase(lowerCase(resourceLongName)), '_')
        const resourceShortName = nth(names, -2);

        if (!modules[resourceShortName]) modules[resourceShortName] = {}

        const resourceType = last(names);
        modules[resourceShortName].name = resourceShortName;

        if (resourceType == 'module') modules[resourceShortName].module = resources[resourceLongName];
        if (resourceType == 'dto') modules[resourceShortName][nth(names, -3)] = resources[resourceLongName];
        if (resourceType == 'entity') modules[resourceShortName].entity = resources[resourceLongName];
        if (resourceType == 'service') modules[resourceShortName].service = resources[resourceLongName];
        if (resourceType == 'controller') modules[resourceShortName].controller = resources[resourceLongName];
    }
    return values(modules);
}