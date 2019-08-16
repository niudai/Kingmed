import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
    selector: 'jhi-service-application-view',
    templateUrl: './service-application-view.component.html',
    styleUrls: ['./service-application-view.component.css']
})
export class ServiceApplicationViewComponent implements OnInit {
    public applicationUrl = SERVER_API_URL + 'api/images/application';
    public path: string;
    public isPdf;

    constructor(protected route: ActivatedRoute,
        protected router: Router) { }

    ngOnInit() {
        this.path = this.route.snapshot.paramMap.get('path');
        this.path.substring(this.path.indexOf('.') + 1) === 'pdf'
             ? this.isPdf = true : this.isPdf = false;
    }

    downLoad() {
        this.router.navigate([this.applicationUrl, this.path]);
    }

    previousState() {
        window.history.back();
    }

}
