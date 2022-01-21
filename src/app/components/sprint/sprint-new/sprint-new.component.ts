import { Component, OnInit, ViewChild } from '@angular/core';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';

@Component({
  selector: 'ngx-sprint-new',
  templateUrl: './sprint-new.component.html',
})
export class SprintNewComponent implements OnInit {
  buttonDisabled = false;

  @ViewChild(SprintFormComponent)
  private formComponent: SprintFormComponent;
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
