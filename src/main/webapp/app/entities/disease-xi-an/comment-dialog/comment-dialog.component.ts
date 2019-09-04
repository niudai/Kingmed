import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeedbackDialogComponent } from 'app/layouts/navbar/feedback-dialog/feedback-dialog.component';
import { IComment } from 'app/shared/model/comment.model';

@Component({
    selector: 'jhi-comment-dialog',
    templateUrl: './comment-dialog.component.html',
    styles: []
})
export class CommentDialogComponent {
    constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>
        , @Inject(MAT_DIALOG_DATA) public data: IComment) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
