
export interface IExpenseType {

      id: string;
      name: string;
}

export class ExpenseTypeDTO implements IExpenseType {
      id: string;
      name: string;

      constructor(formValue: IExpenseType) {
            this.id = formValue.id;
            this.name = formValue.name;
      }
}

export interface RawFormValue {
      id: string;
      name: string;
}