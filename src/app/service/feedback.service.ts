import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  URL: string = "http://localhost:3000/feedback";
  constructor(private http: HttpClient) { }

  saveFeedback(feedback: Feedback) {
    return this.http.post<Feedback>(this.URL, feedback);
  }
}
