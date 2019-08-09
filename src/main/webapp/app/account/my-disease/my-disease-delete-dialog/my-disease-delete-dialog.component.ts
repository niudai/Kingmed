import { UserService } from 'app/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-my-disease-delete-dialog',
  templateUrl: './my-disease-delete-dialog.component.html',
  styles: []
})
export class MyDiseaseDeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<MyDiseaseDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: UserService,
        ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.deleteDiseases(this.data.account.login, this.data.diseaseXiAn).subscribe(
            any => this.dialogRef.close()
        );
    }
}
