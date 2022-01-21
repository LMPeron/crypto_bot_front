import { IUserMini } from 'src/app/@core/data/users';
import { IContact } from "./contact";

export interface IStakeholder {
      id?: string,
      contact?: IContact,
      user?: IUserMini,
      responsability?: string,
      active: boolean
}

export class StakeholderDTO implements IStakeholder {
      id?: string;
      contact?: IContact;
      user?: IUserMini;
      responsability?: string;
      active: boolean;
      constructor(formValue: IStakeholder) {
            this.id = formValue.id;
            this.contact = formValue.contact;
            this.user = formValue.user;
            this.responsability = formValue.responsability;
            this.active = formValue.active;
      }
}


export interface RawFormValue {
      id?: string;
      contact?: IContact,
      user?: IUserMini,
      responsability?: string,
      active: boolean
}