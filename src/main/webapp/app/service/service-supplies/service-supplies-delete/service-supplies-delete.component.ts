import { Route, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ObservedValueOf, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServiceSuppliesService } from '../service-supplies.service';

@Component({
    selector: 'jhi-service-supplies-delete',
    templateUrl: './service-supplies-delete.component.html',
    styles: []
})
export class ServiceSuppliesDeleteComponent implements OnInit {

    public id: number;
    constructor(protected route: ActivatedRoute,
        protected router: Router,
        public service: ServiceSuppliesService) {

    }

    confirmDelete(): void {
        this.service.delete(this.id).subscribe(
            any => this.cancel()
        );
    }

    cancel(): void {
        this.router.navigate(['/service-supplies']);
        // window.history.back();
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');

    }

}
