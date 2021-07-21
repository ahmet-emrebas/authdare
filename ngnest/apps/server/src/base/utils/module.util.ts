import { flattenDeep, keys, pick, startCase, toPairs, values } from 'lodash';
import { readdirSync } from 'fs';
import { join } from 'path';

/**
 *
 * @returns the directory names,which are the name of resource, under resources directory
 */
export const resourceNames = () =>
  readdirSync(join(process.cwd(), 'apps', 'server', 'src', 'resources')).filter(
    (e) => !e.endsWith('.ts'),
  );
/**
 *
 * @returns the all permission strings of all resources
 */
export const resourcePermissions = () => {
  return flattenDeep(
    resourceNames().map((r) =>
      ['Read', 'Write', 'Update', 'Delete'].map(
        (e) => e + ' ' + startCase(r) + ' ' + 'Resource',
      ),
    ),
  );
};

/**
 * Extract properties and their values from an object whose property key ends with the key parameter.
 * @param resource
 * @param key
 * @returns
 */
export function getKeyValueThatKeyEndsWith(
  resource: { [key: string]: any },
  key:
    | 'Entity'
    | 'Controller'
    | 'Service'
    | 'Interceptor'
    | 'Dto'
    | 'FakeData'
    | 'Decorator'
    | 'Module',
): { [key: string]: any } {
  const endedProperties = pick(
    resource,
    keys(resource).filter((e) => e.endsWith(key)),
  );

  const endedPropertiesSetKeys = toPairs(endedProperties)
    .map((e) => ({
      [e[0].replace(key, '').toLowerCase()]: e[1],
    }))
    .reduce((p, c) => ({ ...p, ...c }));

  return endedPropertiesSetKeys;
}

export function getModules(resource: any) {
  return values(getKeyValueThatKeyEndsWith(resource, 'Module'));
}

/**
 * getKeyValueThatKeyEndsWith convience method for entities
 * @param resources
 * @returns Dictionary<string,Entity>
 */
export function getEntities(resources: any) {
  return getKeyValueThatKeyEndsWith(resources, 'Entity');
}

/**
 * getKeyValueThatKeyEndsWith convience method for entities as array
 * @param resources
 * @returns
 */
export function getEntitiesAsArray(resources: any) {
  return values(getKeyValueThatKeyEndsWith(resources, 'Entity'));
}

/**
 * getKeyValueThatKeyEndsWith convience method for FakeData
 * @param resources import * as resources from '@resources'
 * @returns object, whose key is resourcename, value is FakeData[]
 */
export function getFakeDataOfEntities(resources: any) {
  return getKeyValueThatKeyEndsWith(resources, 'FakeData');
}
