import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IQArobot } from 'app/shared/model/q-arobot.model';
import { QArobotService } from './q-arobot.service';

@Component({
    selector: 'jhi-q-arobot-update',
    templateUrl: './q-arobot-update.component.html'
})
export class QArobotUpdateComponent implements OnInit {
    qArobot: IQArobot;
    isSaving: boolean;

    constructor(protected qArobotService: QArobotService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qArobot }) => {
            this.qArobot = qArobot;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.qArobot.id !== undefined) {
            this.subscribeToSaveResponse(this.qArobotService.update(this.qArobot));
        } else {
            this.subscribeToSaveResponse(this.qArobotService.create(this.qArobot));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQArobot>>) {
        result.subscribe((res: HttpResponse<IQArobot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
