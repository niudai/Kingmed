import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubsidiaryService } from 'app/entities/disease-xi-an/subsidiary/subsidiary.service';

@Component({
    selector: 'jhi-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styles: []
})
export class DeleteDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public service: SubsidiaryService) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

onConfirmDelete(): void {
        this.service.delete(this.data.subsidiary.name).subscribe(
            any => this.dialogRef.close()
        );
    }
}
