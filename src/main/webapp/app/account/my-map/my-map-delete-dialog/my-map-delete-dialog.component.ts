import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DiseaseMapService } from 'app/disease-map/disease-map.service';

@Component({
  selector: 'jhi-my-map-delete-dialog',
  templateUrl: './my-map-delete-dialog.component.html',
  styles: []
})
export class MyMapDeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<MyMapDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public service: DiseaseMapService,
        protected snackbar: MatSnackBar
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onConfirmDelete(): void {
        this.service.deattachDiseaseBranch(this.data.diseaseBranch.id).subscribe(any => {
            this.dialogRef.close();
            this.snackbar.open('删除成功', null, { duration: 1000 });
        });
    }

}
