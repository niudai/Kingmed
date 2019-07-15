import { AccountService } from 'app/core/auth/account.service';
import { Route, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-navigation-back',
    templateUrl: './navigation-back.component.html',
    styleUrls: ['./navigation-back.component.css']
})
export class NavigationBackComponent implements OnInit, OnDestroy {
    alerts: any[];

    constructor(
        protected route: Router    ) {}

    ngOnInit() {
    }

    // setClasses(alert) {
    // }

    ngOnDestroy() {
    }

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
