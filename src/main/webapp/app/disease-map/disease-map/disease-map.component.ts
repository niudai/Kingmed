import { DiseaseBranch } from './../../shared/model/disease-branch.model';

import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseMap, DiseaseMap } from 'app/shared/model/disease-map.model';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { Component, OnInit, Inject } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

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

    openMapBottomSheet(map: IDiseaseMap): void {
        const matBottomSheetRef = this.bottomSheet.open(DiseaseMapActionBottomSheetComponent
            , {
                data: { diseaseMap: map },
            });
        matBottomSheetRef.afterDismissed()
            .subscribe(any => this.fetchDiseaseMap());
        // window.history.back();
    }

    openBranchBottomSheet(): void {
        const matBottomSheetRef = this.bottomSheet.open(DiseaseBranchActionBottomSheetComponent
            , {
                data: { diseaseBranch: this.diseaseBranch },
            });
        matBottomSheetRef.afterDismissed()
            .subscribe(any => this.fetchDiseaseMap());
        // window.history.back();
    }

    fetchDiseaseMap() {
        this.diseaseMapService.getAllDiseaseMap(this.id)
                .subscribe(diseaseMaps => this.dataSource.data = diseaseMaps);
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
    constructor(private _bottomSheetRef: MatBottomSheetRef<DiseaseMapActionBottomSheetComponent>
        , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
        , protected dialog: MatDialog
        , protected diseaseMapService: DiseaseMapService) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    createDiseaseMap(): void {
        const dialogRef = this.dialog.open(DiseaseBranchCreateDiseaseMapDialogComponent, {
          data: {name: ''}
        });
        dialogRef.afterClosed().subscribe(result => {
            const diseaseMap: DiseaseMap = new DiseaseMap();
            diseaseMap.name = result;
            this.diseaseMapService
            .attachDiseaseMapToDiseaseMap(diseaseMap, this.data.diseaseMap.id).subscribe();
            console.log('The dialog was closed');
        });
      }
}

@Component({
    selector: 'jhi-disease-branch-action-bottom-sheet',
    templateUrl: './disease-branch-action-bottom-sheet.component.html',
})
export class DiseaseBranchActionBottomSheetComponent {

    animal: string;
    constructor(private _bottomSheetRef: MatBottomSheetRef<DiseaseBranchActionBottomSheetComponent>
        , @Inject(MAT_BOTTOM_SHEET_DATA
        ) public data
        , protected dialog: MatDialog
        , protected diseaseMapService: DiseaseMapService) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    createDiseaseMap(): void {
        const dialogRef = this.dialog.open(DiseaseBranchCreateDiseaseMapDialogComponent, {
          data: {name: this.animal}
        });
        dialogRef.afterClosed().subscribe(result => {
            const diseaseMap: DiseaseMap = new DiseaseMap();
            diseaseMap.name = result;
            this.diseaseMapService
            .attachDiseaseMapToDiseaseBranch(diseaseMap, this.data.diseaseBranch.id).subscribe();
            console.log('The dialog was closed');
            this.animal = result;
        });
      }
}

export interface DialogData {
    name: string;
}

@Component({
    selector: 'jhi-disease-branch-create-disease-map-dialog',
    templateUrl: './disease-branch-create-disease-map-dialog.component.html',
})
export class DiseaseBranchCreateDiseaseMapDialogComponent implements OnInit {

    diseaseMap: IDiseaseMap;

    constructor(
        public dialogRef: MatDialogRef<DiseaseBranchCreateDiseaseMapDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
        , protected diseaseMapService: DiseaseMapService ) {
            // this.diseaseMap.name = 'Haha';
         }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    // save() {
    //     this.diseaseMapService
    //         .attachDiseaseMapToDiseaseBranch(this.diseaseMap, this.data.diseaseBranch.id);
    // }

    previousState() {
        window.history.back();
    }

}
