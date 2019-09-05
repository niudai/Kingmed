import { Component, OnInit } from '@angular/core';
import { SubsidiaryService } from 'app/entities/disease-xi-an/subsidiary/subsidiary.service';
import { ISubsidiary } from 'app/shared/model/subsidiary.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateDialogComponent } from 'app/entities/disease-xi-an/subsidiary/create/create.component';
import { duration } from 'moment';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateComponent } from './update/update.component';

@Component({
    selector: 'jhi-subsidiary-admin',
    templateUrl: './subsidiary-admin.component.html',
    styles: []
})
export class SubsidiaryAdminComponent implements OnInit {
    subsidiaries: ISubsidiary[];

    constructor(protected service: SubsidiaryService, protected dialog: MatDialog, protected snackbar: MatSnackBar) {}

    loadSubsidiaries() {
        this.service.query().subscribe(res => {
            this.subsidiaries = res.body;
        });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateDialogComponent, {
            width: '500px',
            data: { subsidiary: { name: '' } }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.service.create(result).subscribe(any => this.loadSubsidiaries());
        });
    }

    openDeletDialog(sub: ISubsidiary): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: { subsidiary: sub }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.snackbar.open('删除成功', null, { duration: 1000 });
            this.loadSubsidiaries();
        });
    }

    openUpdateDialog(sub: ISubsidiary): void {
        const dialogRef = this.dialog.open(UpdateComponent, {
            width: '500px',
            data: { subsidiary: sub }
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
