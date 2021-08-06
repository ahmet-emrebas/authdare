export interface IPermission<ResourceNames = string> {

    /**
     * Can request permission to the resource.
     * When a member with request-permission tries accessing a resource which is beyond his authority, 
     * administration will be informed and they might accept or deny the request.
     * Administration can give full or limited time access for the user, like 10 minutes.
     */
    request?: boolean;
    read?: boolean;
    write?: boolean;
    update?: boolean;
    delete?: boolean;
    resource: ResourceNames
}