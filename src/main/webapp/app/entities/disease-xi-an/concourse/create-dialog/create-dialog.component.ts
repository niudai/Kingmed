import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jhi-create-dialog',
    templateUrl: './create-dialog.component.html',
    styles: []
})
export class CreateComponent {
    constructor(public dialogRef: MatDialogRef<CreateComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
