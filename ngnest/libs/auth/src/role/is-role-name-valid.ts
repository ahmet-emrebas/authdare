import { NotContains } from 'class-validator';
/**
 * Check the role name is not in the black list
 * @returns 
 */
export function IsRoleNameValid() {
    return NotContains('super')
}
