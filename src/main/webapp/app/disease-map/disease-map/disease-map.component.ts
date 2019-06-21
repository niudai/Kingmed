import { DiseaseBranch } from './../../shared/model/disease-branch.model';

import { ActivatedRoute } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseMap } from 'app/shared/model/disease-map.model';
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
        this.bottomSheet.open(DiseaseMapActionBottomSheetComponent
            , {
                data: { diseaseMap: map },
            });
        // window.history.back();
    }

    openBranchBottomSheet(): void {
        this.bottomSheet.open(DiseaseBranchActionBottomSheetComponent
            , {
                data: { diseaseBranch: this.diseaseBranch },
            });
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
    constructor(private _bottomSheetRef: MatBottomSheetRef<DiseaseMapActionBottomSheetComponent>
        , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}

@Component({
    selector: 'jhi-disease-branch-action-bottom-sheet',
    templateUrl: './disease-branch-action-bottom-sheet.component.html',
})
export class DiseaseBranchActionBottomSheetComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<DiseaseBranchActionBottomSheetComponent>
        , @Inject(MAT_BOTTOM_SHEET_DATA
        ) public data: DialogData
        , protected dialog: MatDialog) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    createDiseaseMap(): void {
        const dialogRef = this.dialog.open(DiseaseBranchCreateDiseaseMapDialogComponent, {
          data: {diseaseBranch: this.data.diseaseBranch}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
}

export interface DialogData {
    diseaseBranch: IDiseaseBranch;
}

@Component({
    selector: 'jhi-disease-branch-create-disease-map-dialog',
    templateUrl: './disease-branch-create-disease-map-dialog.component.html',
})
export class DiseaseBranchCreateDiseaseMapDialogComponent {

    diseaseMap: IDiseaseMap;

    constructor(
        public dialogRef: MatDialogRef<DiseaseBranchCreateDiseaseMapDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
        , protected diseaseMapService: DiseaseMapService ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    save() {
        this.diseaseMapService
            .attachDiseaseMapToDiseaseBranch(this.diseaseMap, this.data.diseaseBranch.id)
            .subscribe(any => this.dialogRef.close());
    }

}
