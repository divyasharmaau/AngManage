import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOfficialDetailsComponent } from './employee-official-details.component';

describe('EmployeeOfficialDetailsComponent', () => {
  let component: EmployeeOfficialDetailsComponent;
  let fixture: ComponentFixture<EmployeeOfficialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOfficialDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOfficialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
