import { NbToastrService } from '@nebular/theme';
import { IClassification } from './../../../@core/data/classification';
import { ClassificationService } from './../../../@core/services/classification.service';
import { ActivatedRoute } from '@angular/router';
import { ClassificationFormComponent } from './../classification-form/classification-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-classification-edit',
  templateUrl: './classification-edit.component.html',
})
export class ClassificationEditComponent implements OnInit {
  loading = false;
  buttonDisabled = false;
  classification: IClassification;

  @ViewChild(ClassificationFormComponent)
  private formComponent: ClassificationFormComponent;
  constructor(
    private route: ActivatedRoute,
    private classificationService: ClassificationService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getData(params.get('classificationId'));
    });
  }

  getData(id) {
    this.loading = true;
    this.classificationService.getOne(id).subscribe(
      (res) => {
        this.loading = false;
        this.classification = res;
      },
      (err) => {
        this.loading = false;

        this.toastrService.show(status, `Ops, houve algum erro!`, {
          preventDuplicates: true,
          status: 'danger',
          duration: 5000,
          icon: 'alert-circle-outline',
        });
      } 
    )
  }

  submitForm() {
    this.formComponent.onSubmit();
  }
  resetForm() {
    this.formComponent.onReset();
  }
  reciverEvent(e) {
    if (e === 'disabled') {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }
}
