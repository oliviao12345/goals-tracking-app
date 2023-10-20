import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGoalComponent } from './update-goal.component';

describe('UpdateGoalComponent', () => {
  let component: UpdateGoalComponent;
  let fixture: ComponentFixture<UpdateGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGoalComponent]
    });
    fixture = TestBed.createComponent(UpdateGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
