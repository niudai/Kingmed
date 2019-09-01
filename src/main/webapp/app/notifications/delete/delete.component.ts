import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../notifications.service';

@Component({
  selector: 'jhi-delete',
  templateUrl: './delete.component.html',
  styles: []
})
export class DeleteComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: NotificationService) {}

        ngOnInit(): void {
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.delete(this.data.ntf.id).subscribe(
            any => this.dialogRef.close()
        );
    }

}
