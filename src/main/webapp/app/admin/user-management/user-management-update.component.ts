import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JhiLanguageHelper, User, UserService } from 'app/core';

export interface Identity {
    value: string;
    viewValue: string;
    fontValue: string;
}

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html',
    styleUrls: ['./user-management-update.component.css']
})
export class UserMgmtUpdateComponent implements OnInit {
    identities: Identity[] = [
        { value: 'doctor', viewValue: '医生', fontValue: 'user-nurse' },
        { value: 'dataAdmin', viewValue: '项目管理员', fontValue: 'user-secret'},
        { value: 'admin', viewValue: '公司管理层', fontValue: 'user-tie'}
    ];
    passwordMatch = true;
    success = false;
    selectedIdentity: Identity;
    confirmPassword: string;
    user: User;
    languages: any[];
    authorities: any[];
    isSaving: boolean;

    constructor(
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        if (this.confirmPassword !== this.user.password) {
            this.passwordMatch = false;
            return;
        }
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(
                    response => {
                        this.onSaveSuccess(response);

                    },
                    () => {
                        this.onSaveError();
                    }
                );
        } else {
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.success = true;
        this.previousState();
    }

    private onSaveError() {
        this.success = false;
        this.isSaving = false;
    }
}
