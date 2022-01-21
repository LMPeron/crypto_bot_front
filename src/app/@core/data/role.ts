export interface IRole {
  id: string;
  name: string;
  perms: IPerm[];
  pSet: [];
}
export interface IPerm {
  id?: string;
  label: string;
}
export class RoleDTO {
  id: string;
  name: string;
  perms: IPerm[];
  pSet: [];
  constructor(formValue: Partial<IRole>) {
    this.id = formValue.id;
    this.name = formValue.name;
    this.perms = formValue.perms;
  }
}
