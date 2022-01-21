export interface IContact {

      id?: string;
      name: string;
      active: boolean;
      email: string;
      fone?: string;
}

export class ContactDTO implements IContact {
      
      id?: string;
      name: string;
      active: boolean;
      email: string;
      fone?: string;

      constructor(formValue: IContact) {
            this.id = formValue.id;
            this.name = formValue.name;
            this.active = formValue.active;
            this.email = formValue.email;
            this.fone = formValue.fone;
      }
}

export interface RawFormValue {
      
      id?: string;
      name: string;
      active: boolean;
      email: string;
      fone?: string;
}