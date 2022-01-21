import { SprintService } from './../../../@core/services/sprint.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Output } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { ISprint, RawFormValue, SprintDTO } from 'src/app/@core/data/sprint';
import { IProject } from 'src/app/@core/data/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
      selector: 'ngx-sprint-form',
      templateUrl: './sprint-form.component.html',
      styleUrls: ['./sprint-form.component.scss']
})
export class SprintFormComponent implements OnInit {


      @Input() title: string;
      @Input() sprint?: ISprint;
      @Input() project: Partial<IProject>;
      @Output() buttonStatus = new EventEmitter();

      loading = false;

      submited = false;
      newForm = true;
      sprintForm: FormGroup;
      submitted = false;


      todo = [
            'Get to work',
            'Pick up groceries',
            'Go home',
            'Fall asleep'
          ];
        
          done = [
            'Get up',
            'Brush teeth',
            'Take a shower',
            'Check e-mail',
            'Walk dog'
          ];


      constructor(
            private formBuilder: FormBuilder,
            private sprintService: SprintService,
            private changeDetector: ChangeDetectorRef,
            private toastrService: NbToastrService,
            protected dialogRef: NbDialogRef<SprintFormComponent>,


      ) { }


      

      ngAfterViewChecked() {
            this.changeDetector.detectChanges();
      }
      ngOnInit() {
            this.initForm();
            this.getData();
      }

      initForm() {
            this.sprintForm = this.formBuilder.group({
                  id: [null],
                  name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
                  project: [null, [Validators.required]],
                  startDate: [null, [Validators.required]],
                  endDate: [null],
                  finishDate: [null],
                  projectTaskList: [null]
            });
      }

      getData() {
            if (this.sprint) {
                  this.sprintForm.patchValue({
                        id: this.sprint.id,
                        name: this.sprint.name,
                        project: this.sprint.project,
                        startDate: this.sprint.startDate,
                        endDate: this.sprint.endDate,
                        finishDate: this.sprint.finishDate,
                        projectTaskList: this.sprint.projectTaskList,
                  });

                  this.newForm = false;
            }
      }

      ngOnChanges() {
            this.sprintForm = this.formBuilder.group({
                  id: [null],
                  name: [{ value: this.sprint.name }, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
                  project: [{ value: this.sprint.project }, [Validators.required]],
                  startDate: [{ value: this.sprint.startDate }, [Validators.required]],
                  endDate: [{ value: this.sprint.endDate }],
                  finishDate: [{ value: this.sprint.finishDate }],
                  projectTaskList: [{ value: this.sprint.projectTaskList }]
            });
      }

      drop(event: CdkDragDrop<string[]>) {
            if (event.previousContainer === event.container) {
              moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            } else {
              transferArrayItem(event.previousContainer.data,
                                event.container.data,
                                event.previousIndex,
                                event.currentIndex);
            }
          }

      get f() {
            return this.sprintForm.controls;
      }

      onSubmit() {
            this.buttonStatus.emit('disabled');
            this.loading = true;
            this.submitted = true;

            if (this.sprintForm.invalid) {
                  this.loading = false;
                  this.buttonStatus.emit('enabled');
                  return;
            }

            const sprint = new SprintDTO(this.sprintForm.value as RawFormValue);

            if (!this.newForm) {
                  // this.submitEdit(sprint);
            } else {
                  this.submitNew(sprint);
            }
      }

      onReset(evt?): void {
            if (evt) {
                  evt.preventDefault();
                  evt.stopPropagation();
            }

            this.initForm();
      }


      // TODO BACK EDITAR SPRINT

      // submitEdit(sprint: SprintDTO) {
      //       this.sprintService.edit(sprint).subscribe(
      //             (data) => {
      //                   this.onSuccess('Classificação alterada com sucesso!');
      //             },
      //             (err) => {
      //                   this.onError(err);
      //             }
      //       );
      // }

      submitNew(sprint: SprintDTO) {
            this.sprintService.addSprint(sprint).subscribe(
                  (data) => {
                        this.onSuccess('Classificação criada com sucesso!');
                  },
                  (err) => {
                        this.onError(err);
                  }
            );
      }


      onError(message: any): void {
            if (message !== '' && message) {
                  this.toastrService.show('', message, {
                        status: 'danger',
                        preventDuplicates: true,
                        hasIcon: false,
                        duration: 6000,
                  });
            } else {
                  this.showToaster();
            }
      }


      showToaster() {
            this.toastrService.show('Aguarde um momento e tente novamente.', 'Erro de conexão com a API', {
                  status: 'danger',
                  preventDuplicates: true,
                  hasIcon: false,
                  duration: 6000,
            });
      }


      onSuccess(msg: string) {
            this.routeBackAndShowToast(msg);
            this.submited = false;
            this.buttonStatus.emit('enabled');
      }

      routeBackAndShowToast(msg: string) {
            this.showToast('success', msg);
            // this.router.navigate(['/projetos/classificacao/lista']);
      }

      showToast(status: NbComponentStatus, message: string) {
            this.toastrService.show('', message, { status });
      }


      close() {
            this.dialogRef.close('');
      }


}
