import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { trim } from 'lodash'

/**
 * String value should have at least 1 char value different than space.
 * @param property 
 * @param validationOptions 
 * @returns 
 */
export function IsNotBlank(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNotBlank',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [propertyName],
            options: validationOptions,

            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return typeof value === 'string' && typeof relatedValue === 'string' && trim(value).length > 0; // you can return a Promise<boolean> here as well, if you want to make async validation
                },
                defaultMessage(args: ValidationArguments) {
                    return "$property should have at least 1 char value different than space!"
                }
            },
        });
    };
}