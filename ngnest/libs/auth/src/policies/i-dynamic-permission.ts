import { IRole, } from "./i-role";
import { IPermission } from './i-permission';


export interface IDynamicPermission {
    till?: Date;
    roles?: IRole[];
    permissions?: IPermission[];
}