import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaveListComponent } from './my-leave-list.component';

describe('MyLeaveListComponent', () => {
  let component: MyLeaveListComponent;
  let fixture: ComponentFixture<MyLeaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLeaveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
