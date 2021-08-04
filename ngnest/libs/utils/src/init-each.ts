import { ClassConstructor, classToClass, Transform, TransformOptions } from "class-transformer";


export function __initEach<T = any>(C: ClassConstructor<T>, value: any) {
    return value && typeof value == 'object' && value.map && value?.map((e: T) => classToClass(new C(e))) || undefined;
}


/**
 * Initialize each item in the array with the provided class constructor.
 * @param C class constructor
 * @param options TransformOptions
 * @returns initialized items of array
 */
export function InitEach<T = any>(C: ClassConstructor<T>, options?: TransformOptions) {
    return Transform(({ value }) => __initEach(C, value), options)
}