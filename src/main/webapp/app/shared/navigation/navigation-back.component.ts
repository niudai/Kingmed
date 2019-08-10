import { JhiLanguageHelper, AccountService, LoginModalService, LoginService } from 'app/core';
import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-navigation-back',
    templateUrl: './navigation-back.component.html',
    styleUrls: ['./navigation-back.component.css']
})
export class NavigationBackComponent implements OnInit {
    alerts: any[];

    constructor(
        private route: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        // this.accountService.authenticate(false);
    }

    // setClasses(alert) {
    // }

    previousState() {
        window.history.back();
    }

    goHome() {
        this.route.navigate(['']);
    }

    goRobot() {
        this.route.navigate(['robot']);
    }
}
