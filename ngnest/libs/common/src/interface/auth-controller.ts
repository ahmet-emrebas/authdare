export interface IAuthController {
    login(...args: any[]): any;
    signup(...args: any[]): any;
    forgotPassword(...args: any[]): any;
    requestOneTimeLoginCode(...args: any[]): any;
    updateProfile(...args: any[]): any;
    join(...args: any[]): any;
}
