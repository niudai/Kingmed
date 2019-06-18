
import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseMap } from 'app/shared/model/disease-map.model';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-disease-map',
    templateUrl: './disease-map.component.html',
    styles: []
})
export class DiseaseMapComponent implements OnInit {
    public diseaseMaps: IDiseaseMap[];
    public diseaseBranch: IDiseaseBranch;
    public id: number;
    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('diseaseBranchId');
        this.diseaseMapService.getAllDiseaseMap(this.id)
            .subscribe(diseaseMaps => this.diseaseMaps = diseaseMaps);
        this.diseaseMapService.getDiseaseBranch(this.id)
            .subscribe(diseaseBranch => this.diseaseBranch = diseaseBranch);
    }

}
