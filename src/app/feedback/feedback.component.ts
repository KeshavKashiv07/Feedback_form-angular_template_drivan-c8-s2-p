import { Component, OnInit } from '@angular/core';
import { Feedback } from '../model/feedback';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  feedback: Feedback = {};
  location = ['Huntsville', 'Springdale', 'Orlando', 'Augusta', 'New York'];
  constructor (private _snackBar: MatSnackBar, private feedbackService: FeedbackService){ }

  onSubmit(feedbackForm: any) {
    this.feedbackService.saveFeedback(feedbackForm.value).subscribe({
    next:data=>{
      this._snackBar.open('Feedback submitted successfully', 'success', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
  },
  error:err=>{
    alert("Failure while connecting to server, try again!!");
  }})
  feedbackForm.resetForm();
}

}
