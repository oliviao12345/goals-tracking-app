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
  errorMessage: string = ''; // Variable to store error message if any
  addingGoal: boolean = false;
  goalAdded: boolean = false;
  showSpinner: boolean = false;

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
    if(!this.goalName || !this.goalCodingLanguage || !this.goalAge || !this.goalContent){
      this.errorMessage = "ALL FIELDS MUST BE COMPLETED. TRY AGAIN!";
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
        this.errorMessage = '';
  
        setTimeout(() => {
          this.addingGoal = false; // Set the addingGoal flag to false after a delay of 3 seconds
        }, 3000);
      },
      (error: string) => {
        console.error('Error creating goal:', error);
        this.addingGoal = false;
        this.goalAdded = false;
        this.errorMessage = error;
      }
    );
  }
  
}  