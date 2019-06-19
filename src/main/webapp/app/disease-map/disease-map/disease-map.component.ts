
import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseMap } from 'app/shared/model/disease-map.model';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'jhi-disease-map',
    templateUrl: './disease-map.component.html',
    styleUrls: ['./disease-map.component.css']
})
export class DiseaseMapComponent implements OnInit {
    public diseaseMaps: IDiseaseMap[];
    public diseaseBranch: IDiseaseBranch;
    public id: number;
    public dataSource = new MatTreeNestedDataSource<IDiseaseMap>();
    public treeControl = new NestedTreeControl<IDiseaseMap>
        (node => node.diseaseMaps);
    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute
        , protected bottomSheet: MatBottomSheet) { }
    public hasChild = (_: number, node: IDiseaseMap) => !!node.diseaseMaps && node.diseaseMaps.length > 0;
    openBottomSheet(): void {
        this.bottomSheet.open(DiseaseMapActionBottomSheetComponent);
        // window.history.back();
    }
    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('diseaseBranchId');
        this.diseaseMapService.getAllDiseaseMap(this.id)
            .subscribe(diseaseMaps => this.dataSource.data = diseaseMaps);
        this.diseaseMapService.getDiseaseBranch(this.id)
            .subscribe(diseaseBranch => this.diseaseBranch = diseaseBranch);
    }

}

@Component({
    selector: 'jhi-disease-map-action-bottom-sheet',
    templateUrl: './disease-map-action-bottom-sheet.component.html',
})
export class DiseaseMapActionBottomSheetComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<DiseaseMapActionBottomSheetComponent>) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
