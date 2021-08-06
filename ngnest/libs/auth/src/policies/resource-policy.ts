import { ImObject } from '@authdare/utils';
import { v4 as uuid } from 'uuid'

/**
 * Resource Access Policies
 */
export const Policies = ImObject({

    /**
     * This key is for storing the policies of the user into the user's session so that upon request policies are compared and allow / deny the user request.
     */
    SESSION_KEY: uuid(),

    /**
     * Property key of enforced roles for the resource, which will be used for storing policy in session or request or any prefered storage item.
     * @policy User Role
     */
    ROLE: uuid(),

    /**
     * Property key of enforced permissions for the resource path in session or request or any prefered storage item.
     * @policy User Permission
     */
    PERMISSION: uuid(),

    /**
     * Property key of  PUBLIC policy for the resource path in session/request/or whereever stored.
     * This policy allows any user to consume the resouce/resoruces
     * @policy Public Resource
     */
    PUBLIC: uuid(),

    /**
     * Property key of MEMBER policy for the resource, which will be used for storing policy in session or request or any prefered storage item.
     * This policy allows authenticated users (with or without permissions/roles) 
     * to consume the resource/resources like special blogs that only member can access.
     * @policy Member
     */
    MEMBER: uuid(),

    /**
     * Property key of DYNAMIC policy for the resource, which will be used for storing policy in session or request or any prefered storage item.
     */
    DYNAMIC: uuid()
})

