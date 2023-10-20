import { Component, Inject } from '@angular/core';
import { GoalsService } from '../GoalsService';
import { GoalsModel } from 'src/app/goals/GoalsModel';

@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.css'],
})
export class UpdateGoalComponent {
  goalName!: string; // Variable to store the name of the goal
  goalCodingLanguage!: string; // Variable to store the coding language of the goal
  goalAge!: number; // Variable to store the age of the goal
  goalContent!: string; // Variable to store the content of the goal
  goals: GoalsModel[] = []; // Array to store the list of goals
  errorMessageCreate: string = ''; // Variable to store error message if any

  idToUpdate!: string;
  MessageUpdateGoal: string = '';
  updatingGoal: boolean = false;
  goalUpdated: boolean = false;
  confirmMessageUpdateGoal: string = '';
  showSpinner: boolean = false; // Flag to control the visibility of a loading spinner

  constructor(private goalsService: GoalsService) {}

  UpdateGoal() {
    // Check if the idToUpdate field is empty
    if (!this.idToUpdate) {
      this.MessageUpdateGoal = 'NO ID ENTERED. TRY AGAIN!';
    }
    // Check if any of the other fields (goalName, goalCodingLanguage, goalAge, goalContent) are empty
    else if (
      !this.goalName ||
      !this.goalCodingLanguage ||
      !this.goalAge ||
      !this.goalContent
    ) {
      this.MessageUpdateGoal = 'ALL FIELDS MUST BE COMPLETED. TRY AGAIN!';
    } else {
      // Set the updatingGoal flag to true to show the loading spinner
      this.updatingGoal = true;

      // Create a payload object with the values from the form fields
      const payload = {
        id: this.idToUpdate,
        name: this.goalName,
        codingLanguage: this.goalCodingLanguage,
        age: this.goalAge,
        goal: this.goalContent,
      };

      // Call the updateGoal method in the goalsService and pass the payload and idToUpdate
      this.goalsService.updateGoal(payload, this.idToUpdate).subscribe(
        (response: string) => {
          // Update the success message
          this.MessageUpdateGoal = 'Goal Updated Successfully';

          // Set a timeout to reset the updatingGoal flag after 3 seconds
          setTimeout(() => {
            this.updatingGoal = false;
          }, 3000);
        },
        (error) => {
          // If an error occurs while updating the goal, handle the error
          console.error('Error updating goal:', error);

          // Reset the flags and set an appropriate error message based on the error status
          this.updatingGoal = false;
          this.goalUpdated = false;
          if (error.status === 404) {
            this.MessageUpdateGoal =
              'ID not found. Please check the ID in the database and try again.';
          } else {
            this.MessageUpdateGoal =
              'An error occurred while updating the goal. Please try again later.';
          }
        }
      );
    }
  }
}
