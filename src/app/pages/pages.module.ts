import { ProjectTaskListComponent } from './project-task/project-task-list/project-task-list.component';
import { ProjectListComponent } from './projetos/lista-projetos/project-list.component';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbListModule, NbCardModule, NbFormFieldModule, NbIconModule, NbButtonModule, NbInputModule, NbActionsModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundModule } from './not-found/not-found.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from '../pipes/pipes.module';

const PAGES_MODULES = [DashboardModule, ComponentsModule];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbFormFieldModule,
    NbMenuModule,
    NotFoundModule,
    NbListModule,
    NbActionsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    // SwiperModule,
    ...PAGES_MODULES,
    PipesModule,
  ],
  declarations: [PagesComponent, ProjectListComponent, ProjectTaskListComponent],
})
export class PagesModule { }
