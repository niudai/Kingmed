import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';
import { DiseaseGuangDongService } from './disease-guang-dong.service';

@Component({
    selector: 'jhi-disease-guang-dong-update',
    templateUrl: './disease-guang-dong-update.component.html'
})
export class DiseaseGuangDongUpdateComponent implements OnInit {
    diseaseGuangDong: IDiseaseGuangDong;
    isSaving: boolean;

    constructor(protected diseaseGuangDongService: DiseaseGuangDongService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diseaseGuangDong }) => {
            this.diseaseGuangDong = diseaseGuangDong;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.diseaseGuangDong.id !== undefined) {
            this.subscribeToSaveResponse(this.diseaseGuangDongService.update(this.diseaseGuangDong));
        } else {
            this.subscribeToSaveResponse(this.diseaseGuangDongService.create(this.diseaseGuangDong));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiseaseGuangDong>>) {
        result.subscribe((res: HttpResponse<IDiseaseGuangDong>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
