import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeeOfficialDetailsComponent } from './add-edit-employee-official-details.component';

describe('AddEditEmployeeOfficialDetailsComponent', () => {
  let component: AddEditEmployeeOfficialDetailsComponent;
  let fixture: ComponentFixture<AddEditEmployeeOfficialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmployeeOfficialDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmployeeOfficialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
