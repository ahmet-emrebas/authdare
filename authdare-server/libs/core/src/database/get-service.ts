import { ModelsMap } from '@authdare/models';
import { Connection } from 'typeorm';
import { ResourceService } from '../resource';
import { findEntity } from "./find-entity";

/**
 * Get resource service of the entity
 * @param {Connection} con 
 * @param {Array<Entity>} entities 
 * @param {string} resourceName 
 * @returns 
 */
export function getService<E = any>(con: Connection, entities: any[], resourceName: string): ResourceService {
    const entity = findEntity(entities, resourceName)
    const repo = con.getRepository<E>(entity as any);
    const service = new ResourceService(repo, ModelsMap[resourceName].createDTO, ModelsMap[resourceName].updateDTO);
    return service;
}