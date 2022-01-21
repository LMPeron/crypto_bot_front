import { IContact } from './../../../@core/data/contact';
import { ContactService } from './../../../@core/services/contact.service';
import { ContactFormComponent } from './../contact-form/contact-form.component';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-contact-edit',
  templateUrl: './contact-edit.component.html',
})
export class ContactEditComponent implements OnInit {
  loading = false;
  buttonDisabled = false;
  contact: IContact;

  @ViewChild(ContactFormComponent)
  private formComponent: ContactFormComponent;
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getData(params.get('contactId'));
    });
  }

  getData(id) {
    this.loading = true;
    this.contactService.getOne(id).subscribe(
      (res) => {
        this.loading = false;
        this.contact = res;
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
