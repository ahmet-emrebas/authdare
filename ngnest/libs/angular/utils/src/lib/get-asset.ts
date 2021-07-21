import { environment } from "apps/client/src/environments/environment";
/**
 * base path '/authdare/materials/assets/'
 * @param assetPath 
 * @returns {string}
 */
export function asset(assetPath: string): string {
    const base = environment.production ? '/authdare/materials/assets/' : '/assets/';
    return `${base}${assetPath}`

}