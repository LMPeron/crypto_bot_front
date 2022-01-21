export interface ISchedule {
  id: string;
  name: string;
  intervals: IInterval[];
}

export interface IInterval {
  dayOfWeek: number;
  end: number;
  id: string;
  start: number;
  name?: string;
  times: ITime[];
}

export interface ITime {
  value: string;
}

export class ScheduleDTO {
  id: string;
  name: string;
  intervals: IInterval[];

  constructor(formValue: ISchedule) {
    this.id = formValue.id;
    this.name = formValue.name;
    this.intervals = formValue.intervals;
  }
}
