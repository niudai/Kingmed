import { Component, OnInit } from '@angular/core';
import { ConcourseService } from 'app/entities/disease-xi-an/concourse/concourse.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IConcourse } from 'app/shared/model/concourse.model';
import { CreateComponent } from 'app/entities/disease-xi-an/concourse/create-dialog/create-dialog.component';

@Component({
    selector: 'jhi-help-link',
    templateUrl: './help-link.component.html',
    styles: []
})
export class HelpLinkComponent implements OnInit {
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

    ngOnInit() {
        this.loadSubsidiaries();
    }
}
