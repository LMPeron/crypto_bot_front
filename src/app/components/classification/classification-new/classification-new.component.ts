import { ClassificationFormComponent } from './../classification-form/classification-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-classification-new',
  templateUrl: './classification-new.component.html',
})
export class ClassificationNewComponent implements OnInit {
  buttonDisabled = false;

  @ViewChild(ClassificationFormComponent)
  private formComponent: ClassificationFormComponent;
  constructor() {}

  ngOnInit(): void {}
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
