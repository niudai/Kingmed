import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQArobot } from 'app/shared/model/q-arobot.model';
import { QArobotService } from './q-arobot.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { on } from 'cluster';
import { DeleteDialogData } from './q-arobot-delete-dialog-data';

@Component({
    selector: 'jhi-q-arobot-delete-dialog',
    templateUrl: './q-arobot-delete-dialog.component.html'
})
export class QArobotDeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<QArobotDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
        protected qArobotService: QArobotService,
        protected router: Router) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.qArobotService.delete(this.data.qArobot.id).subscribe(
            any => this.dialogRef.close()
        );
    }
}

@Component({
    selector: 'jhi-q-arobot-delete-popup',
    template: ''
})
export class QArobotDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute
        , protected router: Router
        , protected modalService: NgbModal
        , protected dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(QArobotDeleteDialogComponent, {
          width: '250px',
        //   data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        //   this.animal = result;
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // this.ngbModalRef = null;
    }
}
