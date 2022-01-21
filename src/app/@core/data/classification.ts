export interface IClassification {
      name: string;
      active: boolean;
      id: string;
}

export class ClassificationDTO implements IClassification {
      name: string;
      active: boolean;
      id: string;
      constructor(formValue: IClassification) {
            this.active = formValue.active;
            this.name = formValue.name;
            this.id = formValue.id;
      }
}

export interface RawFormValue {
      name: string;
      active: boolean;
      id: string;
}