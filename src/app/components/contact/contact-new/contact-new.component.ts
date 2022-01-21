import { ContactFormComponent } from './../contact-form/contact-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-contact-new',
  templateUrl: './contact-new.component.html',
})
export class ContactNewComponent implements OnInit {
  buttonDisabled = false;

  @ViewChild(ContactFormComponent)
  private formComponent: ContactFormComponent;
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
