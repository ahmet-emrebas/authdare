import { IPermission } from "./i-permission";

export interface IRole {
    name: string;
    permissions: IPermission[]
}