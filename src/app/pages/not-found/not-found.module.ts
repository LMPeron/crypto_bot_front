import { NgModule } from '@angular/core';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NotFoundComponent } from './not-found.component';



@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,

  ],
  declarations: [
    NotFoundComponent,
  ],
  providers: [],
})
export class NotFoundModule { }
