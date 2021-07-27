export class Permission<T = any> {
  constructor(
    public readonly resource: string,
    public readonly method: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE',
    public readonly properties?: (keyof T)[] | ['all']
  ) { }
}
export class Role {
  constructor(
    public readonly role: string,
    public readonly permmissions: Permission[],

  ) { }
}
