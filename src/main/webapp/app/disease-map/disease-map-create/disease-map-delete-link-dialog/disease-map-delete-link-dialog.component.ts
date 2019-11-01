import { Component, OnInit, Inject } from '@angular/core';
import { DiseaseMapService } from 'app/disease-map/disease-map.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'jhi-disease-map-delete-link-dialog',
  templateUrl: './disease-map-delete-link-dialog.component.html',
  styles: []
})
export class DiseaseMapDeleteLinkDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DiseaseMapDeleteLinkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: DiseaseMapService,
        protected router: Router) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.deleteLink(this.data.linkCard.id).subscribe(
            any => this.dialogRef.close()
        );
    }

}
