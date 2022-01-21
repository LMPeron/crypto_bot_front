import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbButtonModule,
  NbRadioModule,
  NbSelectModule,
  NbIconModule,
  NbBadgeModule,
  NbAlertModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbButtonModule,
    NbBadgeModule,
    RouterModule,
    NbRadioModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    ComponentsModule,
    NbAlertModule,
  ],
  declarations: [DashboardComponent],
  providers: [],
})
export class DashboardModule {}
