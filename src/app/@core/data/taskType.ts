
import { IGroup } from './group';

export interface ITaskType {
  group: IGroup;
  groupId: string;
  id: string;
  isReopen: boolean;
  name: string;
  product: string[];
}

export class TaskTypeDTO {
  id: string;
  name: string;
  product: string[];
  isReopen: boolean;
  group: Partial<IGroup> = { id: '' };

  constructor(formValue: ITaskType) {
    this.id = formValue.id;
    this.name = formValue.name;
    this.product = formValue.product;
    if (formValue.groupId) {
      this.group.id = formValue.groupId;
    } else {
      this.group = null;
    }
    this.isReopen = formValue.isReopen;
  }
}
