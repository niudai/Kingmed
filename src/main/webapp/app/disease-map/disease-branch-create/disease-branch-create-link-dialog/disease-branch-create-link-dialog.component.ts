import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-disease-branch-create-link-dialog',
    templateUrl: './disease-branch-create-link-dialog.component.html',
    styles: []
})
export class DiseaseBranchCreateLinkDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DiseaseBranchCreateLinkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected router: Router) { }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
