import { Component } from '@angular/core';
import { GoalsService } from '../GoalsService';
import { GoalsModel } from 'src/app/goals/GoalsModel';

@Component({
  selector: 'app-view-goal',
  templateUrl: './view-goal.component.html',
  styleUrls: ['./view-goal.component.css'],
})
export class ViewGoalComponent {
  goals: GoalsModel[] = []; // Array to store the list of goals
  successMessage: string = ''; // Variable to store success message if goals are refreshed successfully
  errorMessage: string = ''; // Variable to store error message if any
  showSpinner: boolean = false; // Flag to control the visibility of the loading spinner

  refreshingGoal: boolean = false;
  goalRefreshed: boolean = false;

  constructor(private goalsService: GoalsService) {}

  onViewAllGoals() {
    this.successMessage = ''; // Clear success message
    this.errorMessage = ''; // Clear error message
    this.showSpinner = true; // Show the loading spinner

    setTimeout(() => {
      this.goalsService.getAllGoals().subscribe(
        (response) => {
          this.goals = response;
          this.successMessage = 'Goals refreshed successfully!';
          this.showSpinner = false; // Hide the loading spinner
        },
        (error) => {
          console.error('Error fetching goals:', error);
          this.errorMessage = 'Failed to refresh goals. Please try again.';
          this.showSpinner = false; // Hide the loading spinner
        }
      );
    }, 3000); // Simulate a delay of 3 seconds
  }
}
