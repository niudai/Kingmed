import { LoginModalService } from './../../core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';

@Component({
    selector: 'jhi-account-settings',
    templateUrl: './account-settings.component.html',
    styles: []
})
export class AccountSettingsComponent implements OnInit {

    constructor(
        private loginService: LoginService,
        private  loginModalService: LoginModalService,
        private accountService: AccountService
        ) { }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    ngOnInit() {
    }

    login() {
        this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
    }

}
