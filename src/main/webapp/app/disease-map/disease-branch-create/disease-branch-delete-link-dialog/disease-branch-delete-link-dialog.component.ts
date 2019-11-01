import { DiseaseMapService } from './../../disease-map.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-disease-branch-delete-link-dialog',
  templateUrl: './disease-branch-delete-link-dialog.component.html',
  styles: []
})
export class DiseaseBranchDeleteLinkDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DiseaseBranchDeleteLinkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: DiseaseMapService,
        protected router: Router) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.deleteLink(this.data.linkCard).subscribe(
            any => this.dialogRef.close()
        );
    }
}
