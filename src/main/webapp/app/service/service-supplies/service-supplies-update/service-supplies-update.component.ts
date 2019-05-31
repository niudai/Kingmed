import { ServiceSuppliesService } from './../service-supplies.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    selector: 'jhi-service-supplies-update',
    templateUrl: './service-supplies-update.component.html',
    styles: []
})
export class ServiceSuppliesUpdateComponent implements OnInit {

    id: number;
    name: string; // name to be updated.

    constructor(protected route: ActivatedRoute
        , public service: ServiceSuppliesService) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
    }

    confirmUpdate() {
        this.service.update(this.id, this.name).subscribe(
            any => this.cancel()
        );
    }

    cancel() {
        window.history.back();
    }

}
