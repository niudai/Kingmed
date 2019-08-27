import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeedbackService } from './feedback.service';
import { Feedback } from 'app/shared/model/feedback.model';


export interface FeedbackData {
  content?: string;
  phone?: string;
}

@Component({
  selector: 'jhi-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styles: []
})
export class FeedbackDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
