import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
    selector: 'jhi-service-supplies-view',
    templateUrl: './service-supplies-view.component.html',
    styleUrls: ['./service-supplies-view.component.css']
})
export class ServiceSuppliesViewComponent implements OnInit {
    public suppliesUrl = SERVER_API_URL + 'api/images/supplies';
    public id: number;

    constructor(protected route: ActivatedRoute,
        protected router: Router) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
    }

    downLoad() {
        this.router.navigate([this.suppliesUrl, this.id]);
    }

    previousState() {
        window.history.back();
    }

}
