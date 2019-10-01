import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService, IUser, User } from 'app/core';
import { Register } from './register.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export interface Identity {
    value: string;
    viewValue: string;
    fontValue: string;
}
@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    identities: Identity[] = [
        { value: 'doctor', viewValue: '医生', fontValue: 'user-nurse' },
        { value: 'dataAdmin', viewValue: '项目管理员', fontValue: 'user-secret'},
        { value: 'admin', viewValue: '公司管理层', fontValue: 'user-tie'}
    ];
    selectedIdentity: Identity;
    _confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: IUser;
    success: boolean;
    modalRef: NgbModalRef;
    authorities: String[];

    registerForm: FormGroup;

    get email() { return this.registerForm.get('email'); }

    get login() { return this.registerForm.get('login'); }

    get phoneNumber() { return this.registerForm.get('phoneNumber'); }

    get identity() { return this.registerForm.get('identity'); }

    get password() { return this.registerForm.get('password'); }

    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public errorMatcher: ErrorStateMatcher
    ) {}

    ngOnInit() {
        this.success = false;
        this.registerAccount = new User();
        this.registerAccount.email = '';
        this.registerService.authorities()
            .subscribe(res => this.authorities = res);
        this.registerForm = new FormGroup(
            {
                'login': new FormControl('', [
                    Validators.required,
                    Validators.pattern('[_@a-zA-Z0-9-]*')
                ]),
                'email': new FormControl('', [
                    Validators.required,
                    Validators.email
                ]),
                'identity': new FormControl('', [
                    Validators.required
                ]),
                'firstName': new FormControl(''),
                'phoneNumber': new FormControl('', [
                    Validators.pattern('[+0-9]*')
                ]),
                'workAddress': new FormControl(''),
                'workType': new FormControl(''),
                'selfIntro': new FormControl(''),
                'password': new FormControl('', [
                    Validators.minLength(6),
                    Validators.required
                ]),
                'confirmPassword': new FormControl(''),
            });
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        console.log(`${this.registerForm.value['password']} + ${this.registerForm.value['confirmPassword']}`);
        if (this.registerForm.value['password'] !== this.registerForm.value['confirmPassword']) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            if (this.registerForm.value['identity'].value === 'doctor') {
                this.registerAccount.authorities = ['ROLE_USER', 'ROLE_DOCTOR'];
            } else if (this.registerForm.value['identity'].value === 'admin') {
                this.registerAccount.authorities = ['ROLE_USER'];
            } else if (this.registerForm.value['identity'].value === 'dataAdmin') {
                this.registerAccount.authorities = ['ROLE_ADMIN', 'ROLE_USER'];
            }
            this.registerAccount.login = this.registerForm.value['login'];
            this.registerAccount.email = this.registerForm.value['email'];
            this.registerAccount.firstName = this.registerForm.value['firstName'];
            this.registerAccount.phoneNumber = this.registerForm.value['phoneNumber'];
            this.registerAccount.workAddress = this.registerForm.value['workAddress'];
            this.registerAccount.workType = this.registerForm.value['workType'];
            this.registerAccount.selfIntro = this.registerForm.value['selfIntro'];
            this.registerAccount.password = this.registerForm.value['password'];

            this.languageService.getCurrent().then(key => {
                this.registerAccount.langKey = key;
                this.registerService.save(this.registerAccount).subscribe(
                    () => {
                        this.success = true;
                    },
                    response => this.processError(response)
                );
            });
        }
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
