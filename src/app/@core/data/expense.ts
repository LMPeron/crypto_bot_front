import { IProject } from './project';
import { IExpenseType } from './expenseType';

export interface IExpense {

      id?: string;
      description: string;
      date: Date;
      value: number;
      quantity: number;
      otherType: string;
      expenseType: IExpenseType;
      project: IProject;
}

export class ExpenseDTO implements IExpense {
      id: string;
      description: string;
      date: Date;
      value: number;
      quantity: number;
      otherType: string;
      expenseType: IExpenseType;
      project: IProject;

      constructor(formValue: IExpense) {
            this.id = formValue.id;
            this.description = formValue.description;
            this.date = formValue.date;
            this.value = formValue.value;
            this.quantity = formValue.quantity;
            this.otherType = formValue.otherType;
            this.expenseType = formValue.expenseType;
            this.project = formValue.project;
      }
}

export interface RawFormValue {
      id: string;
      description: string;
      date: Date;
      value: number;
      quantity: number;
      otherType: string;
      expenseType: IExpenseType;
      project: IProject;
}