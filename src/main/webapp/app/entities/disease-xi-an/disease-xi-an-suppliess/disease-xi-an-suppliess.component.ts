import { ServiceSuppliesService } from './../../../service/service-supplies/service-supplies.service';
import { IFile } from './../../../shared/model/file.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiseaseXiAnService } from '../disease-xi-an.service';

@Component({
    selector: 'jhi-disease-xi-an-suppliess',
    templateUrl: './disease-xi-an-suppliess.component.html',
    styleUrls: ['./disease-xi-an-suppliess.component.css']
})
export class DiseaseXiAnSuppliessComponent implements OnInit {

    suppliess: IFile[];
    diseaseId: number;
    constructor(protected activatedRoute: ActivatedRoute
        , protected diseaseXiAnService: DiseaseXiAnService
        , public suppliesService: ServiceSuppliesService) { }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('id');
        this.diseaseXiAnService.getSuppliess(this.diseaseId).subscribe(
            any => this.suppliess = any.body
        );
    }

    previousState() {
        window.history.back();
    }

}
