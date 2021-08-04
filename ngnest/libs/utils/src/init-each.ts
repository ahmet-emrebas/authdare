import { ClassConstructor, classToClass, Transform, TransformOptions } from "class-transformer";

export function InitEach<T = any>(C: ClassConstructor<T>, options?: TransformOptions) {
    return Transform(({ value }) => value?.map((e: T) => classToClass(new C(e))), options)
}