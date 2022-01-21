export interface IFilter {
  status: string;
  description: string;
  number: string;
  companyId: string;
  ownerId: string;
  group: string;
  startDate?: string;
  endDate?: string;
  dateField?: string;
}

export class FilterDTO implements IFilter {
  status: string;
  description: string;
  number: string;
  companyId: string;
  ownerId: string;
  group: string;
  startDate?: string;
  endDate?: string;
  dateField?: string;

  constructor(formValue: RawFormValue) {
    this.status = formValue.status ?? '';
    this.dateField = formValue.dateType ?? '';
    this.companyId = '';
    this.startDate = formValue.startDate ? formValue.startDate : '';
    this.endDate = formValue.endDate ? formValue.endDate : '';

    formValue.filters.map((x) => {
      if (x.type === 'description') {
        this.description = x.value ?? '';
      } else if (x.type === 'number') {
        this.number = x.value ?? '';
      } else if (x.type === 'company') {
        this.companyId = x.value ?? '';
      } else if (x.type === 'group') {
        this.group = x.value ?? '';
      } else if (x.type === 'owner') {
        this.ownerId = x.value ?? '';
      }
    });
  }
}

export interface RawFormValue {
  status: string;
  dateType: string;
  startDate: string;
  endDate: string;
  filters: { type: string; value: string }[];
}
