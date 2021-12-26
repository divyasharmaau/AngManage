import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeePersonalDetailsComponent } from './add-edit-employee-personal-details.component';

describe('AddEditEmployeePersonalDetailsComponent', () => {
  let component: AddEditEmployeePersonalDetailsComponent;
  let fixture: ComponentFixture<AddEditEmployeePersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmployeePersonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmployeePersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
