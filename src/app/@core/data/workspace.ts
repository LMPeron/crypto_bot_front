import { ICompany } from './company';
import { IUserMini } from './users';

export interface IWorkspace {
  id?: string;
  name?: string;
  active: boolean;
  owner?: IUserMini;
  company?: ICompany;
  listUser: IUserMini[];
  closed: boolean;
}

export class WorkspaceDTO implements IWorkspace {
  id?: string;
  name: string;
  active: boolean;
  owner?: IUserMini;
  company: ICompany;
  listUser: IUserMini[];
  closed: boolean;

  constructor(formValue: IWorkspace) {
    this.id = formValue.id;
    this.name = formValue.name;
    this.active = formValue.active;
    this.owner = formValue.owner;
    this.company = formValue.company;
    this.listUser = formValue.listUser;
    this.closed = formValue.closed;
  }

}

export interface RawFormValue {
  id?: string;
  name: string;
  active: boolean;
  owner?: IUserMini;
  company: ICompany;
  listUser: IUserMini[];
  closed: boolean;
}