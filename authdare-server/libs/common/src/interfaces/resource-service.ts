export interface ResourceService<
  TEntity = any,
  TCreateDTO = any,
  TUpdateDTO = any,
  TQueryOptions = any,
  DeleteResponse = any,
  UpdateResponse = any,
> {
  save(obj: TCreateDTO): Promise<TEntity>;
  find(queryOptions: TQueryOptions): Promise<TEntity[]>;
  findOne(queryOptions: TQueryOptions): Promise<TEntity>;
  findOneById(id: number): Promise<TEntity>;
  delete(id: number): DeleteResponse;
  update(id: number, obj: TUpdateDTO): UpdateResponse;
}
