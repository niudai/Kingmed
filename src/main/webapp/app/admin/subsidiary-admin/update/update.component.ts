import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jhi-update',
    templateUrl: './update.component.html',
    styles: []
})
export class UpdateComponent {
    constructor(public dialogRef: MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
