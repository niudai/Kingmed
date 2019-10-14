import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ConcourseService } from 'app/entities/disease-xi-an/concourse/concourse.service';

@Component({
    selector: 'jhi-concourse-delete-dialog',
    templateUrl: './concourse-delete-dialog.component.html',
    styles: []
})
export class ConcourseDeleteDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConcourseDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public service: ConcourseService,
        protected snackbar: MatSnackBar
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onConfirmDelete(): void {
        this.service.delete(this.data.concourse.pseudoId).subscribe(any => {
            this.dialogRef.close();
            this.snackbar.open('删除成功', null, { duration: 1000 });
        });
    }
}
