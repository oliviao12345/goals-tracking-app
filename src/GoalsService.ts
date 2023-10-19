import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoalsModel } from './GoalsModel';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private apiUrl = 'http://localhost:7295/api'; // Replace with your Spring backend API endpoint

  //Inject the HTTP Client Module
  constructor(private http: HttpClient) { }

  //-------------------GET ALL GOALS------------------------------------------------
  // Add /goals as the endpoint to get all goals in the backend is api/goals
  getAllGoals(): Observable<GoalsModel[]> {
    const url = `${this.apiUrl}/goals`;

    // Send a GET request to the backend API to fetch all goals
    return this.http.get<GoalsModel[]>(url);
  }

  //-------------------POST/CREATE A NEW GOAL------------------------------------------------
  
// Define a function named "createGoal" which takes a parameter named "goal" of type "any"
// The function returns an Observable that emits a string
  createGoal(goal: any): Observable<string> {
    const url = `${this.apiUrl}/goals`;
  
    // Send a POST request to the specified URL with the goal data
    return this.http.post(url, goal, { observe: 'response', responseType: 'text' }).pipe(
      map((response: HttpResponse<any>) => {
        // Check if the response status code is 201 (Created)
        if (response.status === 201) {
          return response.body; // Return the response body directly
        } else {
          throw new Error('Failed to create goal.'); // Throw an error if the status code is not 201
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle any errors that occur during the HTTP request
        return throwError('HTTP Failed to create goal.');
      })
    );
  }

 //--------------------------UPDATE A GOAL----------------------------------------
// The updateGoal method takes a goal object and an id parameter of type string.
updateGoal(goal: any, id: string): Observable<string> {
  // Construct the URL for the PUT request using the API URL and the provided ID.
  const url = `${this.apiUrl}/goals/update/${id}`;

  // Send a HTTP PUT request to the specified URL to update the goal.
  // The request expects a response of type string.
  return this.http.put(url, goal, { observe: 'response', responseType: 'text' }).pipe(
    map((response: HttpResponse<any>) => {
      // Check if the response status code is 200 (OK).
      if (response.status === 200) {
        // Return the response body as a string.
        return response.body;
      } else {
        // Throw an error if the status code is not 200.
        throw new Error('Failed to update goal.');
      }
    })
  );
}

//-------------------DELETE A GOAL BY ID------------------------------------------------

// This method deletes a goal by its ID
deleteGoalById(id: string): Observable<any> {
  // Construct the URL for the delete request using the API URL and the goal ID
  const url = `${this.apiUrl}/delete/${id}`;
  
  // Send a DELETE request to the specified URL with a response type of 'text'
  return this.http.delete(url, { responseType: 'text' }).pipe(
    // Map the response to any type
    map((response: any) => {
      // Print the actual response to the console
      console.log(response);
      // Return the response
      return response;
    })
  );
}
  //-------------------DELETE ALL GOALS------------------------------------------------

deleteAllGoals(): Observable<any>{
  const url = `${this.apiUrl}/delete/all`
  return this.http.delete(url, {responseType: 'text'}).pipe(
    map((response: any) => {
      console.log(response);
      return response;
    })
  )
 }
}  
