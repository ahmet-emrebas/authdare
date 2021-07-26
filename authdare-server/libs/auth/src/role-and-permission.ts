export class Permission {
  constructor(public readonly permission: string) {}
}
export class Role {
  constructor(
    public readonly role: string,
    public readonly permmissions: Permission[],
  ) {}
}
