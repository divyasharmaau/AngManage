import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyLeaveComponent } from './edit-my-leave.component';

describe('EditMyLeaveComponent', () => {
  let component: EditMyLeaveComponent;
  let fixture: ComponentFixture<EditMyLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
