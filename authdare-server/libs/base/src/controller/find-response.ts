export interface FindManyResponse<T> {
    name: string;
    profile: "Undefined";
    count: number;
    data: T[]
}