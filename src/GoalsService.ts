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

  constructor(private http: HttpClient) { }

  // Method to get all goals from the backend 
  // Add /goals as the endpoint to get all goals in the backend is api/goals
  getAllGoals(): Observable<GoalsModel[]> {
    const url = `${this.apiUrl}/goals`;

    // Send a GET request to the backend API to fetch all goals
    return this.http.get<GoalsModel[]>(url);
  }

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
}  
