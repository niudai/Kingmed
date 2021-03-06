import { JhiLanguageHelper, AccountService, LoginModalService, LoginService } from 'app/core';
import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MethodCall } from '@angular/compiler';

export interface INavButton {
    color?: string;
    font?: string;
    routerLink: string | any;
}

@Component({
    selector: 'jhi-navigation-back',
    templateUrl: './navigation-back.component.html',
    styleUrls: ['./navigation-back.component.css']
})
export class NavigationBackComponent implements OnInit {
    alerts: any[];
    navButtons: INavButton[];
    navBottomBarWidthPercent = 95;

    constructor(private route: Router, private accountService: AccountService) {}

    ngOnInit() {
        this.navButtons = [
            { color: 'white', font: 'home', routerLink: '/' },
            { color: 'white', font: 'user-circle', routerLink: ['/', 'account', { outlets: { subpage: 'disease' } }] }
            // [routerLink]="['/', 'operation', { outlets: { popup: operation.id + '/delete'} }]"
        ];
        if (this.accountService.hasAnyAuthority(['ROLE_ADMIN'])) {
            this.navButtons.push({ color: 'white', font: 'robot', routerLink: 'robot' });
        }
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
