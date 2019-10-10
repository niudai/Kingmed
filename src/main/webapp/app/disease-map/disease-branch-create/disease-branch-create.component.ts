import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseBranch, DiseaseBranch } from './../../shared/model/disease-branch.model';
import { Component, OnInit } from '@angular/core';
import { IDiseasePartition } from 'app/shared/model/disease-partition.model';
import { IAuthorization, Authorizations } from 'app/shared/util/authorization-util';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-disease-branch-create',
    templateUrl: './disease-branch-create.component.html',
    styleUrls: ['./disease-branch-create.component.css']
})
export class DiseaseBranchCreateComponent implements OnInit {
    public diseaseBranch: IDiseaseBranch;
    public diseasePartition: IDiseasePartition;
    public action: string;
    public authorizations: IAuthorization[];
    public selectedAuth: IAuthorization;

    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute) { }

    ngOnInit() {
        this.authorizations = Authorizations;
        if (this.route.snapshot.paramMap.get('diseaseBranchId')) {
            const id = +this.route.snapshot.paramMap.get('diseaseBranchId');
            this.action = '编辑';
            this.diseaseMapService.getDiseaseBranch(id)
                .subscribe(diseaseBranch => this.diseaseBranch = diseaseBranch.body);
        } else {
            this.action = '创建';
            this.diseaseBranch = new DiseaseBranch();
        }
        // disease partition id
        if (this.route.snapshot.paramMap.get('id')) {
            const id = +this.route.snapshot.paramMap.get('id');
            this.diseaseMapService.getDiseaePartition(id)
                .subscribe(diseasePartition => this.diseasePartition = diseasePartition);
        } else {
            this.diseaseBranch = new DiseaseBranch();
        }
   }

    submit() {
        this.diseaseBranch.type = this.selectedAuth.auth;
        if (this.diseaseBranch.id === undefined ) {
            this.diseaseMapService.postDiseasePartitionsDiseaseBranch(this.diseasePartition.id, this.diseaseBranch)
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
