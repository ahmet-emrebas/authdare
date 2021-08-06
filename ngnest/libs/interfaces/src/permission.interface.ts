export interface IPermission<ResoucesType = string> {
    method: string;
    resource: ResoucesType
}