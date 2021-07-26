import { getArg } from "@authdare/common";

/**
 * Node argv or env key
 */
export const PROFILE_ARGUMENT_KEY = 'profile';

/**
 * First Node Argv
 * Second Environment Variables
 * @returns {string}
 */
export function getProfile(): string {
    return getArg(PROFILE_ARGUMENT_KEY) || process.env.profile;
}