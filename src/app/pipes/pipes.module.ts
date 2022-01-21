import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesFilterPipe } from './button-filter.pipe';

@NgModule({
  declarations: [RulesFilterPipe],
  providers: [RulesFilterPipe],
  exports: [RulesFilterPipe],
  imports: [CommonModule],
})
export class PipesModule {}
