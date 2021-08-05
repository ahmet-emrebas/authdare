export interface IPermission<ResoucesType = string> {
    method: 'get' | 'post' | 'patch' | 'delete' | string;
    resource: ResoucesType
}