import { ImObject } from '@authdare/utils';
import { v4 as uuid } from 'uuid'


export const ResourcePolicy = ImObject({

    /**
     * Property key of enforced roles for the resource path in session/request/or wherever stored.
     */
    ROLE: uuid(),

    /**
     * Property key of enforced permissions for the resource path in session/request/or wherever stored.
     */
    PERMISSION: uuid(),

    /**
     * Property key of  PUBLIC policy for the resource path in session/request/or whereever stored.
     * This policy allows any user to consume the resouce/resoruces
     */
    PUBLIC: uuid(),

    /**
     * Property key of MEMBER policy for the resource path in session/request/or wherever stored.
     * This policy allows authenticated users (with or without permissions/roles) 
     * to consume the resource/resources like special blogs that only member can access.
     */
    MEMBER: uuid(),
})

