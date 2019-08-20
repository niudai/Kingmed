import { AccountService } from 'app/core/auth/account.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['main.component.css']
})
export class JhiMainComponent implements OnInit {

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        public router: Router,
        ) {}

    private getPageTitle(
        routeSnapshot: ActivatedRouteSnapshot
        ) {
        let title: string =
            routeSnapshot.data && routeSnapshot.data['pageTitle']
                ? routeSnapshot.data['pageTitle']
                : 'jhipsterElasticsearchSampleApplicationApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }

    // isAuthenticated(): boolean {
    //     this.accountService.authenticate();
    // }
}
