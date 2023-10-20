import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGoalComponent } from './view-goal.component';

describe('ViewGoalComponent', () => {
  let component: ViewGoalComponent;
  let fixture: ComponentFixture<ViewGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGoalComponent]
    });
    fixture = TestBed.createComponent(ViewGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
