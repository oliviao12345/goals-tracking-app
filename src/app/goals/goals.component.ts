import { Component, OnInit } from '@angular/core'; // Importing necessary modules from Angular

import { GoalsService } from '../../GoalsService'; // Importing the GoalsService to interact with backend API
import { GoalsModel } from 'src/GoalsModel'; // Importing the GoalsModel to define the structure of goals

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  goalName!: string; // Variable to store the name of the goal
  goalCodingLanguage!: string; // Variable to store the coding language of the goal
  goalAge!: number; // Variable to store the age of the goal
  goalContent!: string; // Variable to store the content of the goal
  goals: GoalsModel[] = []; // Array to store the list of goals
  errorMessage: string = ''; // Variable to store error message if any
  addingGoal: boolean = false; // Flag to indicate if a goal is being added
  goalAdded: boolean = false; // Flag to indicate if a goal has been successfully added

  constructor(private goalsService: GoalsService) { }
  
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

  createGoal() {
    const payload = {
      name: this.goalName, // Assign the value of goalName to the 'name' property of the payload object
      codingLanguage: this.goalCodingLanguage, // Assign the value of goalCodingLanguage to the 'codingLanguage' property of the payload object
      age: this.goalAge, // Assign the value of goalAge to the 'age' property of the payload object
      goal: this.goalContent // Assign the value of goalContent to the 'goal' property of the payload object
    };
  
    this.goalsService.createGoal(payload).subscribe(
      (response: string) => {
        console.log('Angular Goal created successfully:', response); // Log the success message with the response
        this.addingGoal = false; // Set the addingGoal flag to false to indicate that goal creation is complete
        this.goalAdded = true; // Set the goalAdded flag to true to indicate that a goal has been successfully added
        if (response === 'Goal created successfully') {
          this.errorMessage = ''; // Clear the error message if the response is 'Goal created successfully!'
        } else {
          this.errorMessage = 'Comp.ts-Failed to create goal. Please try again'; // Set the error message if the response is not 'Goal created successfully!'
        }
      },
      (error: string) => {
        console.error('Error creating goal:', error); // Log the error message if there is an error creating the goal
        this.addingGoal = false; // Set the addingGoal flag to false to indicate that goal creation is complete
        this.goalAdded = false; // Set the goalAdded flag to false to indicate that goal creation failed
        this.errorMessage = error; // Set the error message to the error received
      }
    );
  }
}  