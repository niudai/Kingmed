import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeedbackService } from 'app/layouts/navbar/feedback-dialog/feedback.service';

@Component({
    selector: 'jhi-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styles: []
})
export class DeleteDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: FeedbackService
    ) {}

    ngOnInit(): void {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.delete(this.data.feedback).subscribe(any => this.dialogRef.close());
    }
}
