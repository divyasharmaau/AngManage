import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveAdminComponent } from './edit-leave-admin.component';

describe('EditLeaveAdminComponent', () => {
  let component: EditLeaveAdminComponent;
  let fixture: ComponentFixture<EditLeaveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLeaveAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeaveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
