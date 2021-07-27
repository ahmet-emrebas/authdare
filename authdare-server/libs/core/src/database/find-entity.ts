
/**
 * Find entity by name from entity list
 * @param { Array<Entity>} entities 
 * @param name 
 * @returns 
 */
export function findEntity(entities: any[], name: string) {
    return entities.find(e => `${(e.name as string).toLowerCase()}s` == name);
}