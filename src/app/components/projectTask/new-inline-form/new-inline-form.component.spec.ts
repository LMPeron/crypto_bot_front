import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInlineFormComponent } from './new-inline-form.component';

describe('NewInlineFormComponent', () => {
  let component: NewInlineFormComponent;
  let fixture: ComponentFixture<NewInlineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInlineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInlineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
