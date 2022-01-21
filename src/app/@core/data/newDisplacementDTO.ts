

export class NewDisplacementDTO {
  author: string;
  date: string;
  distance: number;
  startHour: string;
  endHour: string;
  toll: number;
  type: string;
  value: string;

  constructor(formValue: Idisplecement) {
    this.author = formValue.author;
    this.date = formValue.date;
    this.distance = formValue.distance;
    this.startHour = formValue.startHour;
    this.endHour = formValue.endHour;
    this.toll = formValue.toll;
    this.type = formValue.type;
    this.value = formValue.value;
  }
}

export interface Idisplecement {
  author: string;
  date: string;
  distance: number;
  startHour: string;
  endHour: string;
  toll: number;
  type: string;
  value: string;
}
