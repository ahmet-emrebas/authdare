import { snakeCase, last, first, nth } from 'lodash'

export type Model<Entity = any, CreateDTO = any, UpdateDTO = any> = {
    path: string;
    entity: Entity,
    create: CreateDTO,
    update: UpdateDTO
};

export async function getModelsMap(): Promise<{ [key: string]: Partial<Model> }> {
    const modelMap: { [key: string]: Partial<Model> } = {};
    const items = await import('@authdare/database')
    for (let i of Object.values(items)) {
        let c = i as any;
        if (!c.className) continue;

        const mappedName = snakeCase(c.className).split("_");
        const resourceName = nth(mappedName, -2) + 's';
        let classType = last(mappedName) == 'dto' ? first(mappedName) : last(mappedName);
        if (!modelMap[resourceName]) modelMap[resourceName] = {};

        modelMap[resourceName][classType] = c;

    }
    return modelMap
}
