import { ActivatedRoute } from '@angular/router';
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

    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute) { }

    ngOnInit() {
        if (this.route.snapshot.paramMap.get('diseaseBranchId')) {
            const id = +this.route.snapshot.paramMap.get('diseaseBranchId');
            this.diseaseMapService.getDiseaseBranch(id)
                .subscribe(diseaseBranch => this.diseaseBranch = diseaseBranch);
        } else {
            this.diseaseBranch = new DiseaseBranch();
        }
   }

    submit() {
        if (this.diseaseBranch.id === undefined ) {
            this.diseaseMapService.attachDiseaseBranch(this.diseaseBranch)
            .subscribe(any => this.previousState());
        } else {
            this.diseaseMapService.modifyDiseaseBranch(this.diseaseBranch)
            .subscribe(any => this.previousState());
        }

    }

    previousState() {
        window.history.back();
    }

}
