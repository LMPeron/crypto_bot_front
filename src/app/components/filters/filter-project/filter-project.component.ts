import { FilterDTO, RawFormValue } from './../../../@core/data/filter';
import { FilterService } from './../../../@core/services/filter.service';
import { ProjectUtilService } from './../../../@core/services/projectUtil.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
      selector: 'ngx-filter-project',
      templateUrl: './filter-project.component.html',
      styleUrls: ['./filter-project.component.scss'],
})
export class FilterProjectComponent implements OnInit {
      @Output() newEvent = new EventEmitter<string>();

      loading = false;
      loadingCompanies = false;

      companies: any;
      form: FormGroup;

      date = 'creation_date';

      filterOptions = [
            { type: 'company', name: 'Empresa' },
            { type: 'usersInvolved', name: 'Usuários Envolvidos' },
            { type: 'number', name: 'Número' },
            { type: 'description', name: 'Título / Descrição' },
      ];                                                                                                                                                                                                                         
                                                            


      constructor(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            private formBuilder: FormBuilder,
            private projectUtilService: ProjectUtilService,
            private filterService: FilterService,
      ) { }

      ngOnInit() {
            const predefinedFilter = JSON.parse(localStorage.getItem('lb2FilterProject'));
            if (predefinedFilter) {
                  this.initPredefinedForm(predefinedFilter);
                  this.applyFilter();
            } else {
                  this.initForm();
            }
      }

      initForm() {
            this.form = this.formBuilder.group({
                  status: [''],
                  dateType: ['creation_date'],
                  startDate: [null],
                  endDate: [null],

                  filters: this.formBuilder.array([this.newFilter('description', 'Título / Descrição')])
            });
      }

      initPredefinedForm(predefinedFilter) {
            const filtersArray: any[] = [];

            if (predefinedFilter.description !== '') {
                  filtersArray.push(this.newFilter('description', predefinedFilter.description, predefinedFilter.description));
            }
            if (predefinedFilter.company !== '') {
                  filtersArray.push(this.newFilter('company', predefinedFilter.company, predefinedFilter.company));
            }
            if (predefinedFilter.number !== '') {
                  filtersArray.push(this.newFilter('number', predefinedFilter.number, predefinedFilter.number));
            }

            this.form = this.formBuilder.group({
                  status: [predefinedFilter.status],
                  dateType: [predefinedFilter.dateType],
                  startDate: [predefinedFilter.startDate],
                  endDate: [predefinedFilter.endDate],

                  filters: this.formBuilder.array(filtersArray),
            });
      }

      newFilter(type?, name?, value?) {
            return this.formBuilder.group({
                  type: type ?? '',
                  name: name ?? '',
                  value: value ?? ''
            });
      }

      applyFilter() {
            this.loading = true;
            const filterValues = new FilterDTO(this.form.value as RawFormValue);

            this.filterService.applyFilter(filterValues);
            this.newEvent.emit('filter');
      }

      subscribeForm() {
            this.form.get('filters').valueChanges.subscribe((changes) => {
                  changes.map((x, index) => {
                        if (x.type === 'company') {
                              this.projectUtilService.getParentActive()
                        }
                  });
            })
      }

      getParentActive() {
            this.loadingCompanies = true;
            this.projectUtilService.getParentActive().subscribe(
                  (res) => {
                        this.companies = res;
                        this.loadingCompanies = false;
                  },
                  (err) => {
                        this.loadingCompanies = false;
                        console.log(err);
                  }

            )
      }

      resetFilter() {
            this.form.reset();
            this.form.controls.filters.reset();
            (this.form.controls.filters as FormArray).clear();
            this.filterOptions = [
                  { type: 'company', name: 'Empresa' },
                  { type: 'usersInvolved', name: 'Usuários Envolvidos' },
                  { type: 'number', name: 'Número' },
                  { type: 'description', name: 'Título / Descrição' },
            ]
            this.initForm();
      }

      addFilter() {
            this.filters.push(this.newFilter());
            this.filters.controls.map((f) => {
              this.filterOptions = this.filterOptions.filter((x) => x.type !== f.value.type);
            });
          }

      closeFilter() {
            this.resetFilter();
            this.newEvent.emit('closeFilter');
      }

      onChangeFilter(i) {
            (this.form.get('filters') as FormArray).at(i).patchValue({ value: '' });
      }
      savePredefinedFilter() {
            localStorage.setItem('lb2FilterProject', JSON.stringify(new FilterDTO(this.form.value as RawFormValue)));
      }
      clearFilter() {
            localStorage.setItem('lb2FilterProject', JSON.stringify(null));
      }

      get filters(): FormArray {
            return this.form.get('filters') as FormArray;
      }


}
