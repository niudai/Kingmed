import { HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { INotification, Notification } from 'app/shared/model/notification.model';
import { INtfType } from 'app/shared/model/ntf-type.model';
import { ISubsidiary, Subsidiary } from 'app/shared/model/subsidiary.model';
import { Observable } from 'rxjs';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { createRequestOption } from 'app/shared';
import { NTF_TYPE_FOR_DISEASE } from 'app/shared/util/disease-ntf-util';

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
        this.ntf = { title: '', description: ''};
        this.diseaseXiAnService.getAllSubsidiary().subscribe(
            res => {
                this.subsidiaries = res;
                console.log(this.subsidiaries);
                this.selectedSub = this.subsidiaries[0];
            }
        );
        this.types = NTF_TYPE_FOR_DISEASE;
        this.selectedNtfType = this.types[0];
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const params = {
            'ifGenerate': this.ifGenerateNtf,
            'subsidiary.name': this.selectedSub.name,
            'title': this.ntf.title,
            'type': this.selectedNtfType.type,
            'description': this.ntf.description
        };
        if (this.diseaseXiAn.id !== undefined) {
            this.subscribeToSaveResponse(this.diseaseXiAnService.update(params, this.diseaseXiAn));
        } else {
            this.subscribeToSaveResponse(this.diseaseXiAnService.create(params, this.diseaseXiAn));
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
    }
}
