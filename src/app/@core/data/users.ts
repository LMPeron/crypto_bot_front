import { Observable } from 'rxjs';

export interface User {  
  branchId: string;
  branchName: string;
  companyId: string;
  companyName: string;
  email: string;
  firstName: string;
  id: string;
  invisible: boolean;
  lastName: string;
  password: string;
  roleId: string;
  roleName: string;
  username: string;
  perms?: string[];
  planId: string;
  login?: string;
  senha?: string;
  company: string;
  name: string;
  branch: string;
  picture: string;
  contactNumber: string;
  department: string;
  departmentName: string;
  groups: IUserGroup[];
  hangoutUser: string;
  newPassword?: string;
  confirmationPassword?: string;
  office?: string;
  emailAsLogin?: boolean;
  hideMessage?: boolean;
  hideOpportunity?: boolean;
  disabled: boolean;
  relatedCompanyList?: string[];
}
export interface IUserMini {
  id: string;
  name: string;
}
export class UserMiniDTO {
  id: string;

  constructor(formValue: User) {
    this.id = formValue.id;
  }
}

export abstract class UserData {
  id: UserData;

  abstract getUserImage(id: string, tipo: string): Observable<Blob>;
}

export interface IUserGroup {
  actived: boolean;
  id: string;
  name: string;
  owner: User;
}

export class UserGroupDTO {
  actived: boolean;
  id: string;
  name: string;
  owner: User;
  constructor(formValue: IUserGroup) {
    this.actived = formValue.actived;
    this.id = formValue.id;
    this.name = formValue.name;
    this.owner = formValue.owner;
  }
}
