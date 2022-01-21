import { IStakeholder } from './../../../@core/data/stakeholder';
import { NewProjectDialogComponent } from './../../dialog/new-project-dialog/new-project-dialog.component';
import { IContact } from '../../../@core/data/contact';
import { ContactService } from '../../../@core/services/contact.service';
import { PriorityService } from '../../../@core/services/priority.service';
import { IPriority } from '../../../@core/data/priority';
import { ClassificationService } from '../../../@core/services/classification.service';
import { IClassification } from '../../../@core/data/classification';
import { IUserMini } from '../../../@core/data/users';
import { NbAuthExtendedService } from '../../../@auth/nb-auth-extended.service';
import { ProjectUtilService } from '../../../@core/services/projectUtil.service';
import { ProjectService } from '../../../@core/services/project.service';
import { IProject } from '../../../@core/data/project';
import { Component, OnInit, Input, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectDTO, RawFormValue } from 'src/app/@core/data/projectDTO';
import { ICompany } from 'src/app/@core/data/company';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AfterViewChecked } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
import { ActivatedRoute } from '@angular/router';
import { EditProjectDialogComponent } from '../../dialog/edit-project-dialog /edit-project-dialog.component';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'ngx-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, AfterViewChecked, AfterContentInit {
  @Input() project: IProject;

  companies: ICompany[];
  usersByCompany: IUserMini[];
  loadingField = false;
  isEdit: boolean;

  projectForm: FormGroup;
  loading = false;
  submitted = false;
  owner: IUserMini = { id: null, name: null };

  classificationList: IClassification[];
  priorityList: IPriority[];
  contactList: IContact[];

  selectedUsers: { id: string; itemName: string }[] = [];
  selectedStakeholders: { id: string; itemName: string }[] = [];
  dropdownListUser: { id: string; itemName: string }[] = [];
  dropdownListStakeholder: { id: string; itemName: string }[] = [];
  dropdownUsersInvolvedSettings = {};
  dropdownStakeholdersSettings = {};

  additionalOption: string = null;
  additionalsMenu: { name: string, formName: string }[] = [];

  additionalsMenuFalse: { name: string, formName: string }[] = [
    { name: 'Justificação', formName: 'justification' },
    { name: 'Premissa', formName: 'premise' },
    { name: 'Restrições', formName: 'restrictions' },
    { name: 'Critérios de Aceitação', formName: 'acceptanceCriteria' },
    { name: 'Riscos', formName: 'risks' },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private projectUtilService: ProjectUtilService,
    private classificationService: ClassificationService,
    private contactService: ContactService,
    private priorityService: PriorityService,
    private authService: NbAuthExtendedService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private changeDetector: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getData();
    this.getEditProject();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngAfterContentInit() {
    this.changeDetector.detectChanges();
  }

  getData(): void {
    this.loading = true;
    this.owner.id = this.authService.currentUserValue.id;
    this.getParentActive();
    this.getUserbyCompany(this.authService.currentUserValue.company);
    this.getAllClassification();
    this.getAllPriority();
    this.getAllStakeholders();
    this.loading = false;
  }

  getEditProject(): void {
    let projectId: string;
    this.route.paramMap.subscribe((params) => {
      projectId = params.get('projectId');
    });
    if (projectId) {
      this.projectService.getOne(projectId).subscribe(
        (res) => {
          this.project = res;
          this.isEdit = true;
          this.setForm(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  setForm(project: IProject): void {
    this.projectForm.patchValue({
      id: project.id,
      name: project.name,
      description: project.description,
      owner: project.owner != null ? project.owner.id : this.authService.currentUserValue.id,
      dueStartDate: project.dueStartDate,
      companyClient: project.companyClient != null ? project.companyClient.id : null,
      clientName: project.clientName,
      isRegisteredClient: project.isRegisteredClient,
      status: project.status,
      classification: project.classification != null ? project.classification.id : null,
      priority: project.priority != null ? project.priority.id : null,
      stakeholders: project.stakeholders,
      justification: project.justification,
      premise: project.premise,
      restrictions: project.restrictions,
      acceptanceCriteria: project.acceptanceCriteria,
      risks: project.risks,
      estimatedRevenue: project.estimatedRevenue,
      realRevenue: project.realRevenue,
      realSpend: project.realSpend,
      estimatedSpend: project.estimatedSpend,
      estimatedEffort: project.estimatedEffort,
      workspace: project.workspace,
      createdBy: project.createdBy,
      creationDate: project.creationDate,
    });
    project.usersInvolved.forEach(u => {
      this.selectedUsers.push({ id: u.id, itemName: u.name });
    });
    project.stakeholders.forEach(s => {
      this.selectedStakeholders.push({ id: s.id, itemName: s.name });
    })
    this.manageValidators(false);
  }

  initForm(): void {
    this.projectForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      description: [null, [Validators.maxLength(4000)]],
      owner: [null, [Validators.required]],
      dueStartDate: [null],
      dueDate: [null],
      companyClient: [null, [Validators.required]],
      clientName: [null],
      isRegisteredClient: [true],
      usersInvolved: [],
      status: [],
      classification: [],
      priority: [],
      stakeholders: [],
      justification: [null, [Validators.maxLength(2000)]],
      premise: [null, [Validators.maxLength(2000)]],
      restrictions: [null, [Validators.maxLength(2000)]],
      acceptanceCriteria: [null, [Validators.maxLength(2000)]],
      risks: [null, [Validators.maxLength(2000)]],
      estimatedRevenue: [null],
      realRevenue: [null],
      estimatedSpend: [null],
      realSpend: [null],
      estimatedEffort: [null],
      workspace: [null],
      createdBy: [null],
      creationDate: [null]
    });
    this.startDropDownSettings();
    this.projectForm.patchValue({
      company: this.authService.currentUserValue.company,
    });
  }

  manageValidators(turnNull: boolean): any {
    if (this.f.isRegisteredClient.value) {
      if (turnNull) this.f.companyClient.setValue(null);
      this.f.companyClient.setValidators([Validators.required]);
      this.f.clientName.clearValidators();
      this.f.clientName.setValue(null);
    } else {
      if (turnNull) this.f.clientName.setValue(null);
      this.f.clientName.setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
      this.f.companyClient.clearValidators();
      this.f.companyClient.setValue(null);
    }
    this.f.companyClient.updateValueAndValidity();
    this.f.clientName.updateValueAndValidity();
    return null;
  }

  setOwnerName() {
    for (const user of this.usersByCompany) {
      if (user.id === this.owner.id) {
        this.owner = user;
      }
    }
    this.projectForm.patchValue({
      owner: { id: this.owner.id, name: this.owner.name },
    });
  }

  get f() {
    return this.projectForm.controls;
  }

  onSubmit() {
    this.setOwnerName();
    this.manageObjects();
    this.loading = true;
    this.submitted = true;
    if (this.projectForm.invalid) {
      this.loading = false;
      return;
    }
    const project = new ProjectDTO(this.projectForm.value as RawFormValue);
    this.submitProject(project);
  }

  manageObjects(): void {
    this.classificationList.forEach(c => {
      if (c.id !== null && c.id === this.f.classification.value)
        this.projectForm.patchValue({ classification: { id: c.id, name: c.name } });
    }); 
    this.priorityList.forEach(p => {
      if (p.id !== null && p.id === this.f.priority.value)
        this.projectForm.patchValue({ priority: { id: p.id, name: p.name } });
    });
    this.companies.forEach(c => {
      if (c.id !== null && c.id === this.f.companyClient.value)
        this.projectForm.patchValue({ companyClient: { id: c.id, name: c.name } });
    });

    let sList: IStakeholder[] = [];
    this.selectedStakeholders.forEach(s => {
      let sh: IStakeholder = { id: null, active: true, responsability: "" };
      let found: boolean = false;
      if (this.usersByCompany)
        this.usersByCompany.forEach(u => {
          if (u.id === s.id) {
            sh.user = u;
            found = true;
          }
        });
      if (this.contactList)
        this.contactList.forEach(c => {
          if (!found)
            if (c.id === s.id)
              sh.contact = c;
        });

      sList.push(sh);
    });
    this.projectForm.patchValue({ stakeholders: sList });
    this.f.usersInvolved.patchValue(this.selectedUsers);
  }

  submitProject(project: ProjectDTO): void {
    if (this.isEdit)
      this.projectService.updateProject(project).subscribe(
        (data) => {
          this.project = data;
          this.dialogService.open(EditProjectDialogComponent, {
            context: {
              project: this.project,
            },
          });
        },
        (err) => {
          this.loading = false;
          this.submitted = false;
          this.onError(err.msg);
        }
      )
    else
      this.projectService.addProject(project).subscribe(
        (data) => {
          this.project = data;
          this.dialogService.open(NewProjectDialogComponent, {
            context: {
              project: this.project,
            },
          });
        },
        (err) => {
          this.loading = false;
          this.submitted = false;
          this.onError(err.msg);
        }
      );
  }

  getParentActive() {
    this.projectUtilService.getParentActive().subscribe(
      (res) => this.companies = res,
      (err) => this.onError(err.msg)
    );
  }

  getUserbyCompany(company: string) {
    this.projectUtilService.getUsersByCompany(company).subscribe(
      (res) => {
        this.usersByCompany = res;
        this.usersByCompany.forEach((e) => {
          const user = { id: e.id, itemName: e.name };
          this.dropdownListUser.push(user);
        });
      },
      (err) => this.onError(err.msg)
    );
  }

  getAllClassification() {
    this.classificationService.getAll().subscribe(
      (res) => this.classificationList = res,
      (err) => this.onError(err.msg)
    );
  }

  getAllPriority(): void {
    this.priorityService.getAll().subscribe(
      (res) => this.priorityList = res,
      (err) => this.onError(err.msg)
    );
  }

  getAllStakeholders(): void {
    this.contactService.getAll().subscribe(
      (res) => {
        this.contactList = res;
        this.contactList.forEach((e) => {
          const stakeholder = { id: e.id, itemName: e.name };
          this.dropdownListStakeholder.push(stakeholder);
        });
        this.usersByCompany.forEach(u => {
          const stakeholder = { id: u.id, itemName: u.name };
          this.dropdownListStakeholder.push(stakeholder);
        })
      },
      (err) => {
        this.onError(err.msg);
        this.loading = false;
      }
    );
  }

  formatCurrency(value: string): void {
    if (this.projectForm.get(value)) {
      let text: string = this.projectForm.get(value).value.replace(/[$\s]/, '').replace(/[R\s]/, '').replace(/,/g, '.');
      for (let i = 0; i <= text.length; i++)
        if (text[i] == text[i - 1] && text[i] == '.') {
          text = text.slice(0, i - 1) + text.slice(i);
          i--;
        }
      let formatted: string = this.currencyPipe.transform(text, 'BRL', 'symbol');
      this.projectForm.patchValue({
        [value]: formatted
      }, { emitEvent: false });
    }
  }

  onError(message: any): void {
    this.loading = false;
    if (message !== '' && message)
      this.toastrService.show('', message, {
        status: 'danger',
        preventDuplicates: true,
        hasIcon: false,
        duration: 6000,
      });
    else
      this.showToaster();

  }

  changeAdditionalMenuOption(field: string): any {
    for (let i = 0; i < this.additionalsMenu.length; i++)
      if (this.additionalsMenu[i].formName == field) {
        this.additionalsMenuFalse.push(this.additionalsMenu[i]);
        this.f[this.additionalsMenu[i].formName].patchValue(null);
        this.additionalsMenu.splice(i, 1);
        return null;
      }
    for (let i = 0; i < this.additionalsMenuFalse.length; i++)
      if (this.additionalsMenuFalse[i].formName == field) {
        this.additionalsMenu.push(this.additionalsMenuFalse[i]);
        this.additionalsMenuFalse.splice(i, 1);
        return null;
      }
  }

  startDropDownSettings(): void {
    this.dropdownUsersInvolvedSettings = {
      singleSelection: false,
      text: 'Selecione os Usuários Envolvidos',
      selectAllText: 'Selecionar todos',
      filterSelectAllText: 'Selecionar todos filtrados',
      filterUnSelectAllText: 'Desmarcar todos filtrados',
      unSelectAllText: 'Desmarcar todos',
      searchPlaceholderText: 'Procurar',
      enableSearchFilter: true,
      noDataLabel: 'Não há usuários disponíveis',
      classes: 'lb2 lb2-dark',
    };

    this.dropdownStakeholdersSettings = {
      singleSelection: false,
      text: 'Selecione os Stakeholders Envolvidos',
      selectAllText: 'Selecionar todos',
      filterSelectAllText: 'Selecionar todos filtrados',
      filterUnSelectAllText: 'Desmarcar todos filtrados',
      unSelectAllText: 'Desmarcar todos',
      searchPlaceholderText: 'Procurar',
      enableSearchFilter: true,
      noDataLabel: 'Não há usuários disponíveis',
      classes: 'lb2 lb2-dark',
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

  onItemSelect(item: any) {
  }
  onItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
}
