import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'jhi-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {}

      onNoClick(): void {
        this.dialogRef.close();
      }

}
