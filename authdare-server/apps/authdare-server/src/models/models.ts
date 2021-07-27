import { snakeCase } from 'lodash'
export type Model<Entity = any, CreateDTO = any, UpdateDTO = any> = {
    path: string;
    entity: Entity,
    create: CreateDTO,
    update: UpdateDTO
};


export async function getModelsMap(): Promise<Map<string, Model>> {
    const modelMap = new Map<string, Model>();
    const items = await import('@authdare/database')
    const entities = Object.values(items).map(e => {
        const c = e as any;


        if (!c.className) return;

        // [create, org, dto]
        let mappedName = snakeCase(c.className).split("_");




    })

    return modelMap
}
