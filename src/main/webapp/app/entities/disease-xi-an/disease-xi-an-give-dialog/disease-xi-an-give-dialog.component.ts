import { Component, OnInit, Inject } from '@angular/core';
import { DiseaseXiAnMatDeleteDialogComponent, DiseaseXiAnService } from '..';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'app/core';

@Component({
  selector: 'jhi-disease-xi-an-give-dialog',
  templateUrl: './disease-xi-an-give-dialog.component.html',
  styles: []
})
export class DiseaseXiAnGiveDialogComponent {

    login: string; // give the disease to the user specified by login

    constructor(
        public dialogRef: MatDialogRef<DiseaseXiAnGiveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: UserService,
        protected router: Router) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    give(): void {
        this.service.postDiseases(this.login, this.data.diseaseXiAn).subscribe(
            any => this.dialogRef.close()
        );
    }

}
