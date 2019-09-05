import { Component, OnInit } from '@angular/core';
import { ConcourseService } from 'app/entities/disease-xi-an/concourse/concourse.service';

@Component({
    selector: 'jhi-concourse-admin',
    templateUrl: './concourse-admin.component.html',
    styles: []
})
export class ConcourseAdminComponent implements OnInit {
    constructor(protected service: ConcourseService) {}

    ngOnInit() {}
}
