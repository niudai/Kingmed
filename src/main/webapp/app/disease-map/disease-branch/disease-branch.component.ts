import { IDiseaseBranch } from './../../shared/model/disease-branch.model';
import { DiseaseMapService } from './../disease-map.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-disease-branch',
    templateUrl: './disease-branch.component.html',
    styles: []
})
export class DiseaseBranchComponent implements OnInit {

    public diseaseBranches: IDiseaseBranch[];

    constructor(protected diseaseMapService: DiseaseMapService) { }

    ngOnInit() {
        this.diseaseMapService.getAllDiseaseBranch()
            .subscribe(res => this.diseaseBranches = res);
    }

}
