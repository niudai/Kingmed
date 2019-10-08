import { Component, OnInit } from '@angular/core';
import { DiseaseMapService } from '../disease-map.service';
import { DiseasePartition, IDiseasePartition } from 'app/shared/model/disease-partition.model';

@Component({
    selector: 'jhi-disease-partition',
    templateUrl: './disease-partition.component.html',
    styleUrls: ['./disease-partition.component.css']
})
export class DiseasePartitionComponent implements OnInit {
    public diseasePartitions: IDiseasePartition[];

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
