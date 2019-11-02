import { ServicePlatformService } from '../service-platform.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-service-platform-update',
    templateUrl: './service-platform-update.component.html',
    styles: []
})
export class ServicePlatformUpdateComponent implements OnInit {

    id: number;
    name: string; // name to be updated.

    constructor(protected route: ActivatedRoute
        , public service: ServicePlatformService) { }

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
