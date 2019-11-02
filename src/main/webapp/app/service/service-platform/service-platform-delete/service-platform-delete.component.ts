import { Route, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ObservedValueOf, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServicePlatformService } from '../service-platform.service';

@Component({
    selector: 'jhi-service-platform-delete',
    templateUrl: './service-platform-delete.component.html',
    styles: []
})
export class ServicePlatformDeleteComponent implements OnInit {

    public id: number;
    constructor(protected route: ActivatedRoute,
        protected router: Router,
        public service: ServicePlatformService) {

    }

    confirmDelete(): void {
        this.service.delete(this.id).subscribe(
            any => this.cancel()
        );
    }

    cancel(): void {
        this.router.navigate(['/service-platform']);
        // window.history.back();
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');

    }

}
