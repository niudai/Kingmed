import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseasePartition, DiseasePartition } from './../../shared/model/disease-partition.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-disease-partition-create',
    templateUrl: './disease-partition-create.component.html',
    styles: []
})
export class DiseasePartitionCreateComponent implements OnInit {
    public diseasePartition: IDiseasePartition;

    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute) { }

    ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            const id = +this.route.snapshot.paramMap.get('id');
            this.diseaseMapService.getDiseaePartition(id)
                .subscribe(diseasePartition => this.diseasePartition = diseasePartition);
        } else {
            this.diseasePartition = new DiseasePartition();
        }
   }

    submit() {
        if (this.diseasePartition.id === undefined ) {
            this.diseaseMapService.postDiseasePartition(this.diseasePartition)
            .subscribe(any => this.previousState());
        } else {
            console.log('Updating Disease Partition~~~~');
            this.diseaseMapService.putDiseasePartition(this.diseasePartition)
            .subscribe(any => this.previousState());
        }

    }

    previousState() {
        window.history.back();
    }

}
