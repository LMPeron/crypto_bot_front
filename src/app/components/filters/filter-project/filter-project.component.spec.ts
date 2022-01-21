import { FilterProjectComponent } from './filter-project.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FiltroV2Component', () => {
  let component: FilterProjectComponent;
  let fixture: ComponentFixture<FilterProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
