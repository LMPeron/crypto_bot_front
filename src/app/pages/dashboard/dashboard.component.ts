import { Component, OnInit } from '@angular/core';
import { Plano } from 'src/app/@core/data/planos';
import { NbAccessChecker } from '@nebular/security';

export interface IPendinSurvey
{
  satisfactionSurveyId: string;
  tickeId: string;
  ticketSummary: string;
  ticketNumber: number;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit
{
  loadingPlanos = false;
  planos: Plano[];

  planoAtual = '';
  planoAtualLevel: number;
  hoursConsumed: any = '';
  hoursContrated: number;

  hideOpportunity = false;
  hideMessage = false;

  pendingSurveyCount: IPendinSurvey[] = [];

  constructor(
    public accessChecker: NbAccessChecker,
  )
  {
    // this.accessChecker.isGranted('view', 'upgrade').subscribe((perm: any) => {
    //   console.log(perm);
    // });
  }

  ngOnInit(): void
  {


    this.getData();
  }

  getData()
  {

  }

}
