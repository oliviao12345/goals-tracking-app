import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../../GoalsService';
import { GoalsModel } from 'src/GoalsModel';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent  {
  goalName!: string; // Variable to store the name of the goal
  goalCodingLanguage!: string; // Variable to store the coding language of the goal
  goalAge!: number; // Variable to store the age of the goal
  goalContent!: string; // Variable to store the content of the goal
  goals: GoalsModel[] = []; // Array to store the list of goals
  errorMessageCreate: string = ''; // Variable to store error message if any
  
  addingGoal: boolean = false; // Flag to indicate whether a goal is being added
  goalAdded: boolean = false; // Flag to indicate whether a goal has been successfully added
  showSpinner: boolean = false; // Flag to control the visibility of a loading spinner

  idToDelete!: string; // ID of the goal to be deleted
  deletingGoal: boolean = false; // Flag to indicate whether a goal is being deleted
  GoalDeleted: boolean = false; // Flag to indicate whether a goal has been successfully deleted
  errorMessageDelete: string = ''; // Error message related to deleting goals
 
  errorMessageDeleteAll: string = '';
  deletingAllGoals: boolean = false;
  allGoalsDeleted: boolean = false;
  showConfirmationModal = false;
  confirmMessageDeleteAll: string = '';

  idToUpdate!: string;
  MessageUpdateGoal: string = '';
  updatingGoal: boolean = false;
  goalUpdated: boolean = false;
  confirmMessageUpdateGoal: string = '';



// Inject the goals service class into the component
  constructor(private goalsService: GoalsService) { }
  
  //-------------------------GET ALL GOALS------------------------------------------------

  onViewAllGoals() {
    // This method is triggered when the "View All Goals" button is clicked
    // It fetches all goals from the backend API and updates the goals array
    this.goalsService.getAllGoals().subscribe(
      response => {
        // On successful response, assign the received goals to the goals array
        this.goals = response;
      },
      error => {
        // On error response, log the error message to the console
        console.error('Error fetching goals:', error);
      }
    );
  }

//-------------------------UPDATE GOAL BY ID------------------------------------------------

UpdateGoal() {
  // Check if the idToUpdate field is empty
  if (!this.idToUpdate) {
    this.MessageUpdateGoal = "NO ID ENTERED. TRY AGAIN!";
  } 
  // Check if any of the other fields (goalName, goalCodingLanguage, goalAge, goalContent) are empty
  else if (!this.goalName || !this.goalCodingLanguage || !this.goalAge || !this.goalContent) {
    this.MessageUpdateGoal = "ALL FIELDS MUST BE COMPLETED. TRY AGAIN!";
  } else {
    // Set the updatingGoal flag to true to show the loading spinner
    this.updatingGoal = true;

    // Create a payload object with the values from the form fields
    const payload = {
      id: this.idToUpdate,
      name: this.goalName,
      codingLanguage: this.goalCodingLanguage,
      age: this.goalAge,
      goal: this.goalContent
    };

    // Call the updateGoal method in the goalsService and pass the payload and idToUpdate
    this.goalsService.updateGoal(payload, this.idToUpdate).subscribe(
      (response: string) => {
        // Update the success message
        this.MessageUpdateGoal = "Goal Updated Successfully";

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
          this.MessageUpdateGoal = "ID not found. Please check the ID in the database and try again.";
        } else {
          this.MessageUpdateGoal = "An error occurred while updating the goal. Please try again later.";
        }
      }
    );
  }    
}
  //------------------------DELETE A GOAL BY ID------------------------------------------------
  DeleteGoal() {
    // Check if the ID to delete is provided
    if (!this.idToDelete) {
      this.errorMessageDelete = "NO ID ENTERED. TRY AGAIN!";
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
          this.errorMessageDelete = "ID not found. Please check the ID in the database and try again.";
        } else {
          this.errorMessageDelete = "An error occurred while deleting the goal. Please try again later.";
        }
      }
    );
  }  

  //------------------------POST/CREATE A NEW GOAL------------------------------------------------
  createGoal() {
    if(!this.goalName || !this.goalCodingLanguage || !this.goalAge || !this.goalContent){
      this.errorMessageCreate = "ALL FIELDS MUST BE COMPLETED. TRY AGAIN!";
      return;
    }

    this.addingGoal = true; // Set the addingGoal flag to true to indicate that goal creation is in progress
  
    const payload = {
      name: this.goalName,
      codingLanguage: this.goalCodingLanguage,
      age: this.goalAge,
      goal: this.goalContent
    };
  
    this.goalsService.createGoal(payload).subscribe(
      (response: string) => {
        console.log('Goal created successfully:', response);
        this.goalAdded = true;
        this.errorMessageCreate = '';
  
        setTimeout(() => {
          this.addingGoal = false; // Set the addingGoal flag to false after a delay of 3 seconds
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
  //------------------------ DELETE ALL GOALS ------------------------------------------------

  confirmDeleteAllGoals(){
    this.showConfirmationModal = true;
  }

  cancelDeleteAllGoals() {
    this.confirmMessageDeleteAll = 'Thank you for your response. No goals have been deleted. Have a nice day!';
    this.showConfirmationModal = false;

  }
  
  deleteAllGoals() {
    if (this.showConfirmationModal === true) {
      this.goalsService.deleteAllGoals().subscribe(
        () => {
          // Goals deleted successfully
          this.allGoalsDeleted = true;
          this.confirmMessageDeleteAll = 'Thank you for your response. All goals have been deleted.';
  
          // Set a timeout to reset the deletingAllGoals flag after 3 seconds
          setTimeout(() => {
            this.deletingAllGoals = false;
          }, 3000);
        },
        (error) => {
          // Error occurred when deleting all goals
          console.error("Error deleting all goals", error);
  
          // Reset the flags and set an appropriate error message based on the error status
          this.allGoalsDeleted = false;
          this.deletingAllGoals = false;
  
          if (error.status === 404) {
            this.errorMessageDeleteAll = "No goals to be deleted. Please add some goals and try again!";
          } else {
            this.errorMessageDeleteAll = "Error deleting all goals!";
          }
        }
      );
    } else {
      this.confirmMessageDeleteAll = 'Thank you for your response. No goals have been deleted. Have a nice day!';
    }
  }
}  