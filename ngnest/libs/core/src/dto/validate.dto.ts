import { validate, ValidationError } from 'class-validator'

/**
 * Validate the dto instance and return the errors if any or false.
 * @param dtoInstance 
 * @returns {Promise<ValidationError[] | false>} 
 */
export async function validateDto(dtoInstance: any): Promise<ValidationError[] | false> {
    const errors = await validate(dtoInstance)
    if (errors && errors.length) {
        return errors;
    } else {
        return false;
    }
}