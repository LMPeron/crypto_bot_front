import { ContactListComponent } from './../components/contact/contact-list/contact-list.component';
import { ContactEditComponent } from './../components/contact/contact-edit/contact-edit.component';
import { ContactNewComponent } from './../components/contact/contact-new/contact-new.component';
import { ClassificationEditComponent } from './../components/classification/classification-edit/classification-edit.component';
import { ClassificationNewComponent } from './../components/classification/classification-new/classification-new.component';
import { TaskComponent } from './../components/projectTask/project-task.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectTaskListComponent } from './project-task/project-task-list/project-task-list.component';
import { ClassificationListComponent } from '../components/classification/classification-list/classification-list.component';
import { SearchPageComponent } from '../components/form/search-page/search-page.component';
import { UserConfigComponent } from '../components/user/user-config/user-config.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'user',

        children: [
          { path: 'settings', component: UserConfigComponent },
        ],
      },
      {
        path: 'pesquisa/:query',
        component: SearchPageComponent,
      },
      {
        path: 'tarefas',

        children: [
          { path: 'lista', component: ProjectTaskListComponent },
          { path: 'lista/:ownerId', component: ProjectTaskListComponent },
          { path: ':projectTaskId', component: TaskComponent },
        ],
      },
      {
        path: 'classificacao',

        children: [
          { path: 'lista', component: ClassificationListComponent },
          { path: 'novo', component: ClassificationNewComponent },
          { path: ':classificationId', component: ClassificationEditComponent },
        ]

      },
      {
        path: 'contato',

        children: [
          { path: 'lista', component: ContactListComponent },
          { path: 'novo', component: ContactNewComponent },
          { path: ':contactId', component: ContactEditComponent },
        ]

      },

      // {
      //   path: '/dashboard',
      //   redirectTo: 'projetos/dashboard',
      //   pathMatch: 'full',
      // },
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
