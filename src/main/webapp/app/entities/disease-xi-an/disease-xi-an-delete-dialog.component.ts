import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { INotification } from 'app/shared/model/notification.model';
import { ISubsidiary } from 'app/shared/model/subsidiary.model';
import { INtfType } from 'app/shared/model/ntf-type.model';
import { NTF_TYPE_FOR_DISEASE } from 'app/shared/util/disease-ntf-util';

@Component({
    selector: 'jhi-disease-xi-an-delete-dialog',
    templateUrl: './disease-xi-an-delete-dialog.component.html'
})
export class DiseaseXiAnMatDeleteDialogComponent implements OnInit{
    ntf: INotification;
    isSaving: boolean;
    ifGenerateNtf = false;
    subsidiaries: ISubsidiary[];
    types: INtfType[];
    selectedSub: ISubsidiary;
    selectedNtfType: INtfType;

    constructor(
        public dialogRef: MatDialogRef<DiseaseXiAnMatDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: DiseaseXiAnService,
        protected router: Router) {}

        ngOnInit(): void {
            this.isSaving = false;
            this.ntf = { title: '', description: ''};
            this.service.getAllSubsidiary().subscribe(
                res => {
                    this.subsidiaries = res;
                    console.log(this.subsidiaries);
                    this.selectedSub = this.subsidiaries[0];
                }
            );
            this.types = NTF_TYPE_FOR_DISEASE;
            this.selectedNtfType = this.types[0];
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    protected generateNtfToggle() {
        this.ifGenerateNtf = ! this.ifGenerateNtf;
    }

    confirmDelete(): void {
        const params = {
            'ifGenerate': this.ifGenerateNtf,
            'subsidiary.name': this.selectedSub.name,
            'title': this.ntf.title,
            'type': this.selectedNtfType.type,
            'description': this.ntf.description
        };
        this.service.delete(params, this.data.diseaseXiAn.id).subscribe(
            any => this.dialogRef.close()
        );
    }
}


