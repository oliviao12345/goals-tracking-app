import { Component } from '@angular/core';
import { GoalsService } from '../GoalsService';
import { GoalsModel } from 'src/app/goals/GoalsModel';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css'],
})
export class CreateGoalComponent {
  goalName!: string;
  goalCodingLanguage!: string;
  goalAge!: number;
  goalContent!: string;
  goals: GoalsModel[] = [];
  errorMessageCreate: string = '';
  addingGoal: boolean = false;
  goalAdded: boolean = false;
  showSpinner: boolean = false;

  constructor(private goalsService: GoalsService) {}

  createGoal() {
    if (
      !this.goalName ||
      !this.goalCodingLanguage ||
      !this.goalAge ||
      !this.goalContent
    ) {
      this.errorMessageCreate = 'ALL FIELDS MUST BE COMPLETED. TRY AGAIN!';
      return;
    }

    this.addingGoal = true;

    const payload = {
      name: this.goalName,
      codingLanguage: this.goalCodingLanguage,
      age: this.goalAge,
      goal: this.goalContent,
    };

    this.goalsService.createGoal(payload).subscribe(
      (response: string) => {
        console.log('Goal created successfully:', response);
        this.goalAdded = true;
        this.errorMessageCreate = '';

        setTimeout(() => {
          this.addingGoal = false;
        }, 3000);
      },
      (error: string) => {
        console.error('Error creating goal:', error);
        this.addingGoal = false;
        this.goalAdded = false;
        this.errorMessageCreate = error;
      }
    );
  }
}
