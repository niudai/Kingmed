import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    selector: 'jhi-service-application-view',
    templateUrl: './service-application-view.component.html',
    styleUrls: ['./service-application-view.component.css']
})
export class ServiceApplicationViewComponent implements OnInit {
    public applicationUrl = SERVER_API_URL + 'api/images/application';
    public id: number;

    constructor(protected route: ActivatedRoute,
        protected router: Router) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
    }

    downLoad() {
        this.router.navigate([this.applicationUrl, this.id]);
    }

    previousState() {
        window.history.back();
    }

}
