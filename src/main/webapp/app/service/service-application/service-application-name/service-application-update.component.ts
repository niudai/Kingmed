import { ServiceApplicationService } from './../service-application.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-service-application-update',
    templateUrl: './service-application-update.component.html',
    styles: []
})
export class ServiceApplicationUpdateComponent implements OnInit {

    id: number;
    name: string; // name to be updated.

    constructor(protected route: ActivatedRoute
        , public service: ServiceApplicationService) { }

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
