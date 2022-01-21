import { Router } from '@angular/router';
import { ClassificationService } from './../../../@core/services/classification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassificationDTO, IClassification, RawFormValue } from './../../../@core/data/classification';
import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Output } from '@angular/core';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
      selector: 'ngx-classification-form',
      templateUrl: './classification-form.component.html',
})
export class ClassificationFormComponent implements OnInit {

      error: boolean;
      errorList: [];
      errorMsg: string;

      submited = false;
      newForm = true;
      form: FormGroup;
      loading = false;
      submitted = false;

      @Output() buttonStatus = new EventEmitter();
      @Input() classification: IClassification;
      constructor(
            private formBuilder: FormBuilder,
            private classificationService: ClassificationService,
            private changeDetector: ChangeDetectorRef,
            private toastrService: NbToastrService,
            private router: Router

      ) { }

      ngAfterViewChecked() {
            this.changeDetector.detectChanges();
      }
      ngOnInit() {
            this.initForm();
            this.getData();
      }

      getData() {
            if (this.classification) {
                  this.form.patchValue({
                        id: this.classification.id,
                        name: this.classification.name,
                        active: this.classification.active,
                  });

                  this.newForm = false;
            }
      }

      ngOnChanges() {
            this.form = this.formBuilder.group({
              name: [{ value: this.classification.name, disabled: true }, Validators.required],
              active: [ this.classification.active ]
            });
      }

      initForm() {
            this.form = this.formBuilder.group({
                  id: [null],
                  name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
                  active: [ true ]
            });
      }


      get f() {
            return this.form.controls;
      }

      onSubmit() {
            this.buttonStatus.emit('disabled');
            this.loading = true;
            this.submitted = true;

            if (this.form.invalid) {
                  this.loading = false;
                  this.buttonStatus.emit('enabled');
                  return;
            }

            const classification = new ClassificationDTO(this.form.value as RawFormValue);

            if (!this.newForm) {
                  this.submitEdit(classification);
            } else {
                  this.submitNew(classification);
            }
      }

      onReset(evt?): void {
            if (evt) {
              evt.preventDefault();
              evt.stopPropagation();
            }
        
            this.initForm();
      }

      submitEdit(classification: ClassificationDTO) {
            this.classificationService.edit(classification).subscribe(
                  (data) => {
                        this.onSuccess('Classificação alterada com sucesso!');
                  },
                  (err) => {
                        this.onError(err);
                  }
            )
      }

      submitNew(classification: ClassificationDTO) {
            this.classificationService.save(classification).subscribe(
                  (data) => {
                        this.onSuccess('Classificação criada com sucesso!');
                  },
                  (err) => {
                        this.onError(err);
                  }
            );
      }

      onError(err) {
            this.error = true;
            this.errorMsg = err.msg;
            this.errorList = err.listFieldError;
            this.submited = false;
            this.buttonStatus.emit('enabled');
      }
      onSuccess(msg: string) {
            this.routeBackAndShowToast(msg);
            this.submited = false;
            this.buttonStatus.emit('enabled');
      }
      
      routeBackAndShowToast(msg: string) {
            this.showToast('success', msg);
            this.router.navigate(['/projetos/classificacao/lista']);
      }
      
      showToast(status: NbComponentStatus, message: string) {
            this.toastrService.show('', message, { status });
      }


}
