import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IQArobot } from 'app/shared/model/q-arobot.model';
import { QArobotService } from './q-arobot.service';
import { QArobotDeleteDialogComponent } from '.';
import { SNACKBAR_DURATION, SAVE_SUCCESSFUL, SAVE_FAILED } from 'app/app.constants';
@Component({
    selector: 'jhi-q-arobot-update',
    templateUrl: './q-arobot-update.component.html'
})
export class QArobotUpdateComponent implements OnInit {
    qArobot: IQArobot;
    isSaving: boolean;

    constructor(protected qArobotService: QArobotService
        , protected activatedRoute: ActivatedRoute
        , protected dialog: MatDialog
        , protected sackBar: MatSnackBar) {}

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
        this.sackBar.open(SAVE_SUCCESSFUL, null, { duration: SNACKBAR_DURATION});
    }

    protected onSaveError() {
        this.isSaving = false;
        this.sackBar.open(SAVE_FAILED, null, { duration: SNACKBAR_DURATION});
    }
}
