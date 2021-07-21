import { snakeCase, startCase } from 'lodash';

/**
 * Convert SampleClassName into "samples" resource path
 * @param clazz Controller Class
 * @returns
 */
export function toResourcePath(clazz: any) {
  return snakeCase(clazz.name).split('_')[0] + 's';
}

/**
 * Create a permission string from method and resource name as follows
 * method get, resource user  ---> Read User Resource
 *
 * @param method
 * @param resouceName
 * @returns
 */
export function toPermissionString(method: string, resouceName: string) {
  const h = {
    get: 'Read',
    post: 'Write',
    patch: 'Update',
    delete: 'Delete',
  };
  return `${h[method.toLowerCase().trim()]} ${startCase(resouceName)} Resource`;
}
