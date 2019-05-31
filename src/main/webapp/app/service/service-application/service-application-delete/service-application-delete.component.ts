import { Route, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ObservedValueOf, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServiceApplicationService } from '../service-application.service';

@Component({
    selector: 'jhi-service-application-delete',
    templateUrl: './service-application-delete.component.html',
    styles: []
})
export class ServiceApplicationDeleteComponent implements OnInit {

    public id: number;
    constructor(protected route: ActivatedRoute,
        protected router: Router,
        public service: ServiceApplicationService) {

    }

    confirmDelete(): void {
        this.service.delete(this.id).subscribe(
            any => this.cancel()
        );
    }

    cancel(): void {
        this.router.navigate(['/service-application']);
        // window.history.back();
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');

    }

}
