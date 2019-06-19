
import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseMap } from 'app/shared/model/disease-map.model';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
interface FoodNode {
    name: string;
    children?: FoodNode[];
}

const DISEASE_MAP: IDiseaseMap[] = [
    {
      name: 'Fruit',
      diseaseMaps: [
        {name: 'Apple'},
        {name: 'Banana'},
        {name: 'Fruit loops'},
      ]
    }, {
      name: 'Vegetables',
      diseaseMaps: [
        {
          name: 'Green',
          diseaseMaps: [
            {name: 'Broccoli'},
            {name: 'Brussel sprouts'},
          ]
        }, {
          name: 'Orange',
          diseaseMaps: [
            {name: 'Pumpkins'},
            {name: 'Carrots'},
          ]
        },
      ]
    },
  ];

const TREE_DATA: FoodNode[] = [
    {
      name: 'Fruit',
      children: [
        {name: 'Apple'},
        {name: 'Banana'},
        {name: 'Fruit loops'},
      ]
    }, {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [
            {name: 'Broccoli'},
            {name: 'Brussel sprouts'},
          ]
        }, {
          name: 'Orange',
          children: [
            {name: 'Pumpkins'},
            {name: 'Carrots'},
          ]
        },
      ]
    },
  ];

@Component({
    selector: 'jhi-disease-map',
    templateUrl: './disease-map.component.html',
    styles: []
})
export class DiseaseMapComponent implements OnInit {
    public diseaseMaps: IDiseaseMap[];
    public diseaseBranch: IDiseaseBranch;
    public id: number;
    public dataSource = new MatTreeNestedDataSource<IDiseaseMap>();
    public treeControl = new NestedTreeControl<IDiseaseMap>
        (node => node.diseaseMaps);
    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute) { }
    public hasChild = (_: number, node: IDiseaseMap) => !!node.diseaseMaps && node.diseaseMaps.length > 0;
    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('diseaseBranchId');
        this.diseaseMapService.getAllDiseaseMap(this.id)
            .subscribe(diseaseMaps => this.dataSource.data = diseaseMaps);
        this.diseaseMapService.getDiseaseBranch(this.id)
            .subscribe(diseaseBranch => this.diseaseBranch = diseaseBranch);
    }

}
