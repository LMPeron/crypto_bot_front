import { Component, OnInit, Input } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { IProject } from 'src/app/@core/data/project';

@Component({
  selector: 'ngx-progress-bar-projects',
  templateUrl: './progress-bar-projects.component.html',
  styleUrls: ['./progress-bar-projects.component.scss'],
})
export class ProgressBarProjectsComponent implements OnInit {
  @Input() project: IProject;
  porcentage = 0;
  tooltip: string;
  constructor() {}

  ngOnInit(): void {
    this.porcentage = this.porcentagemOcupada(this.project);
  }

  // CALCULA PORCENTAGEM DE HORAS RESTANTES A PARTIR DE DUAS DATAS
  // SE A DATA FINAL FOR  ANTERIOR A DATA ATUAL VOLTA 100, SE NÃO A PORCENTAGEM
  porcentagemOcupada({ dueDate, creationDate, finishDate, dueStartDate }: IProject) {
    let totalUtilizado: number;
    let resultPorcentage: number;
    const today = new Date();

    // retornar 0 caso os dois sejam nulos
    if (!dueDate && !finishDate) {
      return 0;
    }

    // Mudando de formato
    dueStartDate = new Date(dueStartDate);
    dueDate = new Date(dueDate);

    const total = differenceInMinutes(dueDate, dueStartDate);

    if (finishDate) {
      finishDate = new Date(finishDate);
      totalUtilizado = differenceInMinutes(finishDate, dueStartDate);
    } else {
      totalUtilizado = differenceInMinutes(today, dueStartDate);
    }

    const porcentagem = Math.round((totalUtilizado * 100) / total);
    

    if (porcentagem < 0) {
      resultPorcentage = 0;
    } else if (porcentagem > 100) {
      resultPorcentage = 100;
    } else {
      resultPorcentage = porcentagem;
    }

    return resultPorcentage;
  }

  get status() {
    if (this.porcentage <= 25) {
      return 'success';
    } else if (this.porcentage <= 50) {
      return 'info';
    } else if (this.porcentage <= 75) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}
