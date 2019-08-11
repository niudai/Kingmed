import { IUser } from './../../core/user/user.model';
import { Account as IUser } from './../../core/user/account.model';
import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService, JhiLanguageHelper } from 'app/core';
import { Identity } from '../register/register.component';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    identities: Identity[] = [
        { value: 'doctor', viewValue: '医生', fontValue: 'user-nurse' },
        { value: 'dataAdmin', viewValue: '项目管理员', fontValue: 'user-secret'},
        { value: 'admin', viewValue: '公司管理层', fontValue: 'user-tie'}
    ];
    passwordMatch = true;
    error = false;
    success = false;
    selectedIdentity: Identity;
    confirmPassword: string;
    settingsAccount: IUser;
    languages: any[];

    constructor(
        private accountService: AccountService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.settingsAccount = account;
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
    }

    save() {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = true;
                this.accountService.identity(true).then(account => {
                    this.settingsAccount = account;
                });
                this.languageService.getCurrent().then(current => {
                    if (this.settingsAccount.langKey !== current) {
                        this.languageService.changeLanguage(this.settingsAccount.langKey);
                    }
                });
            },
            () => {
                this.success = false;
                this.error = true;
            }
        );
    }
}
