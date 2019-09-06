import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jhi-concourse-update',
    templateUrl: './concourse-update.component.html',
    styles: []
})
export class ConcourseUpdateComponent {
    constructor(
        public dialogRef: MatDialogRef<ConcourseUpdateComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
