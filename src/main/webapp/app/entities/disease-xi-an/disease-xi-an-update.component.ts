import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { EventEmitter } from 'protractor';
import { MatSlideToggleDefaultOptions, MatSlideToggleChange } from '@angular/material';
import { INotification } from 'app/shared/model/notification.model';
import { ISubsidiary } from 'app/shared/model/subsidiary.model';
import { INtfType, NtfType } from 'app/shared/model/ntf-type.model';

@Component({
    selector: 'jhi-disease-xi-an-update',
    templateUrl: './disease-xi-an-update.component.html',
    styleUrls: ['./disease-xi-an-update.component.css']
})
export class DiseaseXiAnUpdateComponent implements OnInit {
    diseaseXiAn: IDiseaseXiAn;
    ntf: INotification;
    isSaving: boolean;
    ifGenerateNtf = false;
    subsidiaries: ISubsidiary[];
    types: INtfType[];
    selectedSub: ISubsidiary;
    selectedNtfType: INtfType;
    constructor(
        protected diseaseXiAnService: DiseaseXiAnService,
        protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
        });
        this.diseaseXiAnService.getAllSubsidiary().subscribe(
            res => {
                this.subsidiaries = res;
                console.log(this.subsidiaries);
                this.selectedSub = this.subsidiaries[0];
            }
        );
        this.types = [
            { type: 'UPDATE', chinese: '项目更新'},
            { type: 'DELETE', chinese: '项目删除'},
            { type: 'STOP', chinese: '项目停做'},
            { type: 'CREATE', chinese: '项目停做'}
        ];
        this.selectedNtfType = this.types[0];
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.ntf = new NtfType();
        this.isSaving = true;
        if (this.diseaseXiAn.id !== undefined) {
            this.subscribeToSaveResponse(this.diseaseXiAnService.update(this.diseaseXiAn));
        } else {
            this.subscribeToSaveResponse(this.diseaseXiAnService.create(this.diseaseXiAn));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiseaseXiAn>>) {
        result.subscribe((res: HttpResponse<IDiseaseXiAn>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected generateNtfToggle() {
        this.ifGenerateNtf = ! this.ifGenerateNtf;
        if (this.ifGenerateNtf) {
            this.ntf = { };
        } else {
            this.ntf = null;
        }
    }
}
