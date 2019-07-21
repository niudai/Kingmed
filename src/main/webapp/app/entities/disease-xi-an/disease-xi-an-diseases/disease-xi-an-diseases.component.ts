import { DiseaseMapAssociateDialogComponent } from './../../../disease-map/disease-map/disease-map.component';
import { HttpResponse } from '@angular/common/http';
import { DiseaseXiAnService } from '..';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DiseaseMapService } from 'app/disease-map/disease-map.service';

@Component({
    selector: 'jhi-disease-xi-an-diseases',
    templateUrl: './disease-xi-an-diseases.component.html',
    styles: []
})
export class DiseaseXiAnDiseasesComponent implements OnInit {
    id: number;
    diseases: IDiseaseXiAn[];
    constructor(
        protected route: ActivatedRoute,
        protected service: DiseaseXiAnService,
        protected dialog: MatDialog
    ) { }

    load() {
        if (this.id) {
            this.service.getDiseases(this.id).subscribe(
                (res: HttpResponse<IDiseaseXiAn[]>) => this.diseases = res.body
            );
        }
    }

    deassociateWithDiseaseXiAn(ownId: number, reversedId: number): void {
        const dialogRef = this.dialog.open(DiseaseDeleteDialogComponent, {
            data: {
                input: false,
                title: '取消关联',
                description: '确定取消该关联?',
                ownId,
                reversedId
            }
        });
        dialogRef.afterClosed().subscribe(any => this.load());
    }

    associateWithDiseaseXiAn(): void {
        const dialogRef = this.dialog.open(DiseaseAssociateDialogComponent, {
            data: {
                input: true,
                title: '关联项目',
                description: '输入项目ID:'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.associateWithDisease(this.id, result).subscribe(
                    any => this.load()
                );
            }
        });
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.load();
    }

}

@Component({
    selector: 'jhi-disease-delete-dialog',
    templateUrl: './disease-xi-an-diseases-delete.component.html',
})
export class DiseaseDeleteDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DiseaseDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected service: DiseaseXiAnService) {
    }

    ngOnInit(): void {
    }

    confirmDelete() {
        this.service
            .deassociateWithDisease(this.data.ownId, this.data.reversedId).subscribe(any => this.onNoClick());
        console.log('The dialog was closed');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}

@Component({
    selector: 'jhi-disease-associate-dialog',
    templateUrl: './disease-xi-an-diseases-associate.component.html',
})
export class DiseaseAssociateDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DiseaseDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected service: DiseaseXiAnService) {
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}
