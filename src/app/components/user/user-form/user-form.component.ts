import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'src/app/@core/services/user.service';


@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  @Output() activeForm = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    // private dialogService: NbDialogService,
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngAfterContentInit() {
    this.changeDetector.detectChanges();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      id: [null],
      name: [null],
      api_key: [null],
      secret: [null],
      active: [null],
      investment: [null],
      profit: [null],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    let user = this.userForm.value;
    this.submitUser(user);
  }

  submitUser(user: any) {
    this.userService.createUser(user).subscribe(
      (res: any) => {
        this.activeForm.emit(true);
        console.log(res)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  cancel() {
    this.activeForm.emit(false);
  }

  showToaster() {
    this.toastrService.show('Aguarde um momento e tente novamente.', 'Erro de conexão com a API', {
      status: 'danger',
      preventDuplicates: true,
      hasIcon: false,
      duration: 6000,
    });
  }

  onItemSelect(item: any) {
  }
  onItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
}
