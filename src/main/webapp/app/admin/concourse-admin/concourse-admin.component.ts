import { Component, OnInit } from '@angular/core';
import { ConcourseService } from 'app/entities/disease-xi-an/concourse/concourse.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IConcourse } from 'app/shared/model/concourse.model';
import { ConcourseUpdateComponent } from './update/concourse-update/concourse-update.component';
import { ConcourseDeleteDialogComponent } from './delete-dialog/concourse-delete-dialog/concourse-delete-dialog.component';
import { CreateComponent } from 'app/entities/disease-xi-an/concourse/create-dialog/create-dialog.component';

@Component({
    selector: 'jhi-concourse-admin',
    templateUrl: './concourse-admin.component.html',
    styles: []
})
export class ConcourseAdminComponent implements OnInit {
    concourses: IConcourse[];

    constructor(protected service: ConcourseService,
        protected dialog: MatDialog,
        protected snackbar: MatSnackBar) {}

    loadSubsidiaries() {
        this.service.query().subscribe(res => {
            this.concourses = res.body._embedded.concourse;
        });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateComponent, {
            width: '500px',
            data: { concourse: { name: '' } }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.service.create(result).subscribe(any => this.loadSubsidiaries());
        });
    }

    openDeletDialog(sub: IConcourse): void {
        const dialogRef = this.dialog.open(ConcourseDeleteDialogComponent, {
            width: '500px',
            data: { concourse: sub }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadSubsidiaries();
        });
    }

    openUpdateDialog(sub: IConcourse): void {
        const dialogRef = this.dialog.open(ConcourseUpdateComponent, {
            width: '500px',
            data: { concourse: sub }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.service.update(result).subscribe(any => {
                this.snackbar.open('更新成功', null, { duration: 1000 });
                this.loadSubsidiaries();
            });
        });
    }

    ngOnInit() {
        this.loadSubsidiaries();
    }
}
