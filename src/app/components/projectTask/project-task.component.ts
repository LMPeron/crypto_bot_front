import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig } from '@nebular/theme';
import { IProjectTask } from 'src/app/@core/data/projectTask';
import { ProjectTaskService } from 'src/app/@core/services/projectTask.service';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss'],
})
export class TaskComponent implements OnInit {
  loadingProject = false;
  loadingTasks = false;

  showDisplacementsTable = false;
  public newDisplacementEvent: Event;

  projectId: string;
  projectTaskId: string;

  canCancel = false;
  canClose = false;
  canReClassify = false;
  canClassify = false;
  canNewTask = false;
  canReopen = false;
  canAddNewDisplacement = false;

  disabledIconConfig: NbIconConfig = {
    icon: 'close-outline',
    pack: 'eva',
  };

  // EVITAR ERRO AO INICIAR POIS NAO ESTA INICIALIZADO

  projectTask: IProjectTask = {
    number: 0,
  };

  tasks: any;

  submitted: boolean;
  error = false;
  listError: {
    listFieldError: [];
    msg: string;
    statusCode: number;
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectTaskService: ProjectTaskService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.getAllData();
  }
  getAllData() {

    this.route.paramMap.subscribe((params) => {

      this.getProjectTask(params.get('projectTaskId'));

    });
  }

  getProjectTask(id: string) {

    this.loadingProject = true;
    this.projectTaskService.getOne(id).subscribe(
      (res) => {
        this.loadingProject = false;
        this.projectTask = res

      },
      (err) => {
        this.loadingProject = false;
        console.log(err);
      }
    );
  }

  gotoTickets() {
    this.router.navigate(['/pages/chamados/lista']);
  }

  goBack() {
    this.location.back();
  }

  reciverEvent(e) {
    if (e === 'newComment' || e === 'uploadEvent' || e === 'newAction') {
      this.getAllData();
    }

    if (e === 'newDisplacement') {
      this.newDisplacementEvent = e;
    }

  }

  checkButtons() {
    // Reseta os valores, para quando atualiza a tela

    this.canCancel = false;
    this.canClose = false;
    this.canReClassify = false;
    this.canClassify = false;
    this.canNewTask = false;
    this.canReopen = false;
  }

  onError(err) {
    this.error = true;
    this.listError = err;
    this.submitted = false;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }


  closeProjectTask(event, projectTaskId: string, rev: string) {
    const data = {
      id: projectTaskId,
    };

    this.projectTaskService.close(data.id, rev).subscribe(
      (res) => {
        //
      },
      (err) => {
        this.error = true;
        this.listError = err;
      }
    );
  }
}
