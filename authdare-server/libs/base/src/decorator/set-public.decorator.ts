import { SetMetadata } from "@nestjs/common";

export const SET_PUBLIC_KEY = 'SET_PUBLIC_KEY'
export const SetPublic = () => SetMetadata(SET_PUBLIC_KEY, SET_PUBLIC_KEY)
