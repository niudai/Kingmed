import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { DiseaseXiAnService } from './disease-xi-an.service';

@Component({
    selector: 'jhi-disease-xi-an-update',
    templateUrl: './disease-xi-an-update.component.html',
    styleUrls: ['./disease-xi-an-update.component.css']
})
export class DiseaseXiAnUpdateComponent implements OnInit {
    diseaseXiAn: IDiseaseXiAn;
    isSaving: boolean;

    constructor(protected diseaseXiAnService: DiseaseXiAnService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
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
}
