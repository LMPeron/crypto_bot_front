import { TradeListComponent } from './trade/trade-list/trade-list.component';
import { TradeTableComponent } from './trade/trade-table/trade-table.component';
import { UserConfigComponent } from './user/user-config/user-config.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { CoinDashboardComponent } from './coin-dashboard/coin-dashboard.component';
import { InactivateExpenseDialog } from './dialog/inactivate-expense-dialog/inactivate-expense-dialog.component';
import { ProjectFormComponent } from './form/project-form/project-form.component';
import { SprintTableComponent } from './sprint/sprint-table/sprint-table.component';
import { SprintNewComponent } from './sprint/sprint-new/sprint-new.component';
import { SprintFormComponent } from './sprint/sprint-form/sprint-form.component';
import { SearchPageComponent } from './form/search-page/search-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { ContactTableComponent } from './contact/contact-table/contact-table.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactNewComponent } from './contact/contact-new/contact-new.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ExpenseTableComponent } from './project/expense/expense-table/expense-table.component';
import { ExpenseFormComponent } from './project/expense/expense-form/expense-form.component';
import { FilterTaskComponent } from './filters/filter-task/filter-task.component';
import { FilterProjectComponent } from './filters/filter-project/filter-project.component';
import { ClassificationListComponent } from './classification/classification-list/classification-list.component';
import { ClassificationTableComponent } from './classification/classification-table/classification-table.component';
import { NewClassificationDialogComponent } from './dialog/new-classification-dialog/new-classification-dialog.component';
import { ClassificationNewComponent } from './classification/classification-new/classification-new.component';
import { TaskComponent } from './projectTask/project-task.component';
import { NewProjectDialogComponent } from './dialog/new-project-dialog/new-project-dialog.component';
import { CardProjectTaskAllComponent } from './projectTask/card-project-task-all/card-project-task-all.component';
import { ProgressBarProjectsComponent } from './../pages/projetos/progress-bar-projetos/progress-bar-projects.component';
import { CardProjectAllComponent } from './project/card-project-all/card-project-all.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule, JsonPipe, TitleCasePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxCurrencyModule } from "ngx-currency";


import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbOptionModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule,
  NbTagModule,
} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PipesModule } from '../pipes/pipes.module';
import { LogoHelpdeskComponent } from './logo-helpdesk/logo-helpdesk.component';
import { ProjectTableComponent } from './project/project-table/project-table.component';
import { ProjectTaskTableComponent } from './projectTask/project-task-table/project-task-table.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { CommentTaskComponent } from './projectTask/comment/comment.component';
import { NewInlineFormComponent } from './projectTask/new-inline-form/new-inline-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UploadComponent } from './upload/upload.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { ClassificationFormComponent } from './classification/classification-form/classification-form.component';
import { ClassificationEditComponent } from './classification/classification-edit/classification-edit.component';
import { EditProjectDialogComponent } from './dialog/edit-project-dialog /edit-project-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserTableComponent } from './user/user-table/user-table.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
const COMPONENTS_MODULES = [
  LogoHelpdeskComponent,
  ProjectTableComponent,
  ProjectTaskTableComponent,
  CardProjectAllComponent,
  CardProjectTaskAllComponent,
  ProgressBarProjectsComponent,
  ProjectFormComponent,
  NewProjectDialogComponent,
  EditProjectDialogComponent,
  InactivateExpenseDialog,
  CommentTaskComponent,
  TaskComponent,
  CoinDashboardComponent,
  NewClassificationDialogComponent,
  ClassificationFormComponent,
  ClassificationNewComponent,
  ClassificationEditComponent,
  ClassificationTableComponent,
  ClassificationListComponent,
  FilterProjectComponent,
  FilterTaskComponent,
  ExpenseFormComponent,
  ExpenseTableComponent,
  ContactFormComponent,
  ContactNewComponent,
  ContactEditComponent,
  ContactListComponent,
  ContactTableComponent,
  SearchPageComponent,
  SprintFormComponent,
  SprintNewComponent,
  SprintTableComponent,
  WalletInfoComponent,
  IncomeChartComponent,
  UserConfigComponent,
  UserTableComponent,
  UserFormComponent,
  AnalyticsDashboardComponent,
  TradeTableComponent,
  TradeListComponent
];

@NgModule({
  declarations: [...COMPONENTS_MODULES, NewInlineFormComponent, UploadComponent, EditTaskDialogComponent],
  imports: [
    CommonModule,
    NbIconModule,
    NbCardModule,
    NbProgressBarModule,
    NbDialogModule.forRoot(),
    CdkTableModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    NbRadioModule,
    NbToggleModule,
    NbUserModule,
    NbListModule,
    NbSelectModule,
    NbSpinnerModule,
    MatTableModule,
    NbAccordionModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NbActionsModule,
    NbOptionModule,
    NbAlertModule,
    NbWindowModule.forRoot(),
    NbTabsetModule,
    PipesModule,
    NbChatModule,
    NbStepperModule,
    NgxChartsModule,
    MatSortModule,
    AngularMultiSelectModule,
    NbCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NbFormFieldModule,
    NgxMaskModule,
    MatExpansionModule,
    NgxCurrencyModule,
    NbTagModule,
    NgApexchartsModule


  ],
  providers: [TitleCasePipe, JsonPipe],
  exports: [...COMPONENTS_MODULES],
  entryComponents: [],
})
export class ComponentsModule { }
