import { ContactDTO, IContact, RawFormValue } from './../../../@core/data/contact';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Output } from '@angular/core';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ContactService } from 'src/app/@core/services/contact.service';

@Component({
      selector: 'ngx-contact-form',
      templateUrl: './contact-form.component.html',
      styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

      error: boolean;
      errorList: [];
      errorMsg: string;

      submited = false;
      newForm = true;
      form: FormGroup;
      loading = false;
      submitted = false;

      invalidEmail = false;

      @Output() buttonStatus = new EventEmitter();
      @Input() contact: IContact;
      constructor(
            private formBuilder: FormBuilder,
            private contactService: ContactService,
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
            if (this.contact) {
                  this.form.patchValue({
                        id: this.contact.id,
                        name: this.contact.name,
                        active: this.contact.active,
                        email: this.contact.email,
                        fone: this.contact.fone
                  });

                  this.newForm = false;
            }
      }

      ngOnChanges() {
            this.form = this.formBuilder.group({
                  name: [{ value: this.contact.name, disabled: true }, Validators.required],
                  active: [{ value: this.contact.active }],
                  email: [{ value: this.contact.email }],
                  fone: [{ value: this.contact.fone }]
            });
      }

      isEmail(email: string): boolean {
            let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return regexp.test(email);
      }

      initForm() {
            this.form = this.formBuilder.group({
                  id: [null],
                  name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
                  active: [true, [Validators.required]],
                  email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
                  fone: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
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

            if (!this.isEmail(this.form.controls.email.value)) {
                  this.loading = false;
                  this.invalidEmail = true;
                  this.buttonStatus.emit('enabled');
                  return;
            }

            const contact = new ContactDTO(this.form.value as RawFormValue);

            if (!this.newForm) {
                  this.submitEdit(contact);
            } else {
                  this.submitNew(contact);
            }
      }

      onReset(evt?): void {
            if (evt) {
                  evt.preventDefault();
                  evt.stopPropagation();
            }

            this.initForm();
      }

      submitEdit(contact: ContactDTO) {
            this.contactService.edit(contact).subscribe(
                  (data) => {
                        this.onSuccess('Classificação alterada com sucesso!');
                  },
                  (err) => {
                        this.onError(err);
                  }
            )
      }

      submitNew(contact: ContactDTO) {
            this.contactService.save(contact).subscribe(
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
            this.router.navigate(['/projetos/contato/lista']);
      }

      showToast(status: NbComponentStatus, message: string) {
            this.toastrService.show('', message, { status });
      }


}
