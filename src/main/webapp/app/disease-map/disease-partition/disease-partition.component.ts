import { Component, OnInit } from '@angular/core';
import { DiseaseMapService } from '../disease-map.service';
import { DiseasePartition } from 'app/shared/model/disease-partition.model';

@Component({
    selector: 'jhi-disease-partition',
    templateUrl: './disease-partition.component.html',
    styles: []
})
export class DiseasePartitionComponent implements OnInit {
    public diseasePartitions: DiseasePartition[];

    constructor(protected service: DiseaseMapService) {}

    ngOnInit() {
        this.service.getDiseasePartitions().subscribe(
            res => {
                this.diseasePartitions = res;
                console.log(res);
            }
        );
    }
}
