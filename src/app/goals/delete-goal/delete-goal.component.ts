import { Component } from '@angular/core';
import { GoalsService } from '../GoalsService';
import { GoalsModel } from 'src/app/goals/GoalsModel';

@Component({
  selector: 'app-delete-goal',
  templateUrl: './delete-goal.component.html',
  styleUrls: ['./delete-goal.component.css'],
})
export class DeleteGoalComponent {
  goalName!: string; // Variable to store the name of the goal
  goalCodingLanguage!: string; // Variable to store the coding language of the goal
  goalAge!: number; // Variable to store the age of the goal
  goalContent!: string; // Variable to store the content of the goal
  goals: GoalsModel[] = []; // Array to store the list of goals
  errorMessageCreate: string = ''; // Variable to store error message if any

  idToDelete!: string; // ID of the goal to be deleted
  deletingGoal: boolean = false; // Flag to indicate whether a goal is being deleted
  GoalDeleted: boolean = false; // Flag to indicate whether a goal has been successfully deleted
  errorMessageDelete: string = ''; // Error message related to deleting goals

  errorMessageDeleteAll: string = '';
  deletingAllGoals: boolean = false;
  allGoalsDeleted: boolean = false;
  showConfirmationModal = false;
  confirmMessageDeleteAll: string = '';
  showSpinner: boolean = false; // Flag to control the visibility of a loading spinner

  constructor(private goalsService: GoalsService) {}

  //------------------------DELETE A GOAL BY ID------------------------------------------------
  DeleteGoal() {
    // Check if the ID to delete is provided
    if (!this.idToDelete) {
      this.errorMessageDelete = 'NO ID ENTERED. TRY AGAIN!';
      return;
    }

    // Set the flag to indicate that the goal is being deleted
    this.deletingGoal = true;

    // Call the deleteGoalById method from the goalsService and subscribe to the response
    this.goalsService.deleteGoalById(this.idToDelete).subscribe(
      () => {
        // If the deletion is successful, update the flags and clear the error message
        this.GoalDeleted = true;
        this.errorMessageDelete = '';

        // Set a timeout to reset the deletingGoal flag after 3 seconds
        setTimeout(() => {
          this.deletingGoal = false;
        }, 3000);
      },
      (error) => {
        // If an error occurs while deleting the goal, handle the error
        console.error('Error deleting goal:', error);

        // Reset the flags and set an appropriate error message based on the error status
        this.deletingGoal = false;
        this.GoalDeleted = false;
        if (error.status === 404) {
          this.errorMessageDelete =
            'ID not found. Please check the ID in the database and try again.';
        } else {
          this.errorMessageDelete =
            'An error occurred while deleting the goal. Please try again later.';
        }
      }
    );
  }
  //------------------------ DELETE ALL GOALS ------------------------------------------------

  confirmDeleteAllGoals() {
    this.showConfirmationModal = true;
  }

  cancelDeleteAllGoals() {
    this.confirmMessageDeleteAll =
      'Thank you for your response. No goals have been deleted. Have a nice day!';
    this.showConfirmationModal = false;
  }

  deleteAllGoals() {
    if (this.showConfirmationModal === true) {
      this.goalsService.deleteAllGoals().subscribe(
        () => {
          // Goals deleted successfully
          this.allGoalsDeleted = true;
          this.confirmMessageDeleteAll =
            'Thank you for your response. All goals have been deleted.';

          // Set a timeout to reset the deletingAllGoals flag after 3 seconds
          setTimeout(() => {
            this.deletingAllGoals = false;
          }, 3000);
        },
        (error) => {
          // Error occurred when deleting all goals
          console.error('Error deleting all goals', error);

          // Reset the flags and set an appropriate error message based on the error status
          this.allGoalsDeleted = false;
          this.deletingAllGoals = false;

          if (error.status === 404) {
            this.errorMessageDeleteAll =
              'No goals to be deleted. Please add some goals and try again!';
          } else {
            this.errorMessageDeleteAll = 'Error deleting all goals!';
          }
        }
      );
    } else {
      this.confirmMessageDeleteAll =
        'Thank you for your response. No goals have been deleted. Have a nice day!';
    }
  }
}
