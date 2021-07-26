import { genSalt, genSaltSync, hash, hashSync } from 'bcrypt'

/**
 * Generate a secret hash
 * @returns 
 */
export async function genSecret() {
    return hash(process.env.toString(), await genSalt(10));
}