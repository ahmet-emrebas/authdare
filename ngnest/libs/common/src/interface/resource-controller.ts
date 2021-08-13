export interface IResourceController {
    query(...args: any[]): any;
    find(...args: any[]): any;
    save(...args: any[]): any;
    update(...args: any[]): any;
    delete(...args: any[]): any;
}
