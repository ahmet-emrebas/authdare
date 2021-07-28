import { values, snakeCase, split, nth, last, first } from "lodash";

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
export async function getResourceMap() {
    const modules: { [key: string]: Partial<Resource> } = {};
    const ms = await import("@authdare/resources");
    for (let __m of values(ms)) {
        const m = __m as any;
        if (!m.className) continue;

        const arr0 = split(snakeCase(m.className), '_')
        const mtype = last(arr0);
        const resourceName = first(arr0) + 's';
        modules[resourceName] = modules[resourceName] || {};
        modules[resourceName][mtype] = m;
        modules[resourceName].path = resourceName;
    }
    return modules;
}