import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseBranch, DiseaseBranch } from './../../shared/model/disease-branch.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-disease-branch-create',
    templateUrl: './disease-branch-create.component.html',
    styles: []
})
export class DiseaseBranchCreateComponent implements OnInit {
    public diseaseBranch: IDiseaseBranch;

    constructor(protected diseaseMapService: DiseaseMapService) { }

    ngOnInit() {
        this.diseaseBranch = new DiseaseBranch();
        this.diseaseBranch.name = 'Test';
    }

    submit() {
        this.diseaseMapService.attachDiseaseBranch(this.diseaseBranch)
            .subscribe(any => this.previousState());
    }

    previousState() {
        window.history.back();
    }

}
