export interface ISurvey {
  answerDate: Date | string;
  answerList: ISurveyAnswerList[];
  creationDate: Date | string;
  deadLineDate: Date | string;
  id: string;
  observation: string;
  surveyConfigDescription: string;
  surveyConfigHasObservation: boolean;
  surveyConfigId: string;
  ticketId: string;
  ticketNumber: number;

  description: string;
  companyName: string;
  companyId: string;
  branchName: string;
  branchId: string;
  active: boolean;
  hasObservation: boolean;
  startDate: string;
  endDate: string;
  answerDeadline: number;
  questionList: ISurveyAnswerList[];
}
export interface ISurveyAnswerList {
  answer?: string;
  id?: string;
  questionDescription?: string;
  question?: string;
  questionId?: string;
  satisfactionSurveyId?: string;
}

export class SurveyDTO {
  startDate: string;
  endDate: string;
  id: string;
  branchId: string;
  companyId: string;
  description: string;
  hasObservation: boolean;
  active: boolean;
  answerDeadline: number;
  questionList: ISurveyAnswerList[];

  constructor(formValue: ISurvey) {
    this.id = formValue.id;
    this.description = formValue.description;
    this.hasObservation = formValue.hasObservation;
    this.active = formValue.active;
    this.branchId = formValue.branchId;
    this.companyId = formValue.companyId;
    this.questionList = formValue.questionList;
    this.answerDeadline = formValue.answerDeadline;
    this.startDate = new Date(formValue.startDate).toISOString();
    this.endDate = new Date(formValue.endDate).toISOString();
  }
}
