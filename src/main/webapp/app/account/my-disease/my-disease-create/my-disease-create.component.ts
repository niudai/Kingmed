import { Account } from 'app/core/user/account.model';
import { Component, OnInit } from '@angular/core';
import { IDiseaseXiAn, DiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { UserService, AccountService } from 'app/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-my-disease-create',
  templateUrl: './my-disease-create.component.html',
  styles: []
})
export class MyDiseaseCreateComponent implements OnInit {

    diseaseXiAn: IDiseaseXiAn;
    account: Account;
    isSaving: boolean;

    constructor(
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
        ) {}

    ngOnInit() {
        this.diseaseXiAn = new DiseaseXiAn();
        this.isSaving = false;
        this.accountService.identity().then(
            account => this.account = account
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.userService.postDiseases(this.account.login, this.diseaseXiAn));
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiseaseXiAn[]>>) {
        result.subscribe(res => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

}
