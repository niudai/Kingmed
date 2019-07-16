import { DiseaseBranch } from './../../shared/model/disease-branch.model';

import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseMapService } from './../disease-map.service';
import { IDiseaseMap, DiseaseMap } from 'app/shared/model/disease-map.model';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { relative } from 'path';
import { timingSafeEqual } from 'crypto';

@Component({
    selector: 'jhi-disease-map',
    templateUrl: './disease-map.component.html',
    styleUrls: ['./disease-map.component.css']
})
export class DiseaseMapComponent implements OnInit {
    public diseaseMaps: IDiseaseMap[];
    public previousDataSources = new Array<IDiseaseMap[]>();
    public diseaseBranch: IDiseaseBranch;
    public id: number;
    public windowWidth: number;
    public dataSource = new MatTreeNestedDataSource<IDiseaseMap>();
    public treeControl = new NestedTreeControl<IDiseaseMap>
        (node => node.diseaseMaps);
    constructor(protected diseaseMapService: DiseaseMapService
        , protected route: ActivatedRoute
        , protected bottomSheet: MatBottomSheet
        , protected router: Router
        , protected dialog: MatDialog) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowWidth = window.innerWidth;
    }

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

    deassociateWithDiseaseXiAn(diseaseXiAnId: number, diseaseMapId: number): void {
        const dialogRef = this.dialog.open(DiseaseXiAnDeleteDialogComponent , {data: {
            input: false,
            title: '取消关联',
            description: '确定取消该关联?',
            diseaseXiAnId,
            diseaseMapId
        }});
        dialogRef.afterClosed().subscribe(any => this.fetchDiseaseMap());
    }

    deassociateWithQArobot(qArobotId: number, diseaseMapId: number): void {
        const dialogRef = this.dialog.open(QArobotDeleteDialogComponent , {data: {
            input: false,
            title: '取消关联',
            description: '确定取消该关联?',
            qArobotId,
            diseaseMapId
        }});
        dialogRef.afterClosed().subscribe(any => this.fetchDiseaseMap());
    }

    fetchDiseaseMap() {
        this.diseaseMapService.getAllDiseaseMap(this.id)
            .subscribe(diseaseMaps => this.dataSource.data = diseaseMaps);
    }

    /**
     * Zoom in
     */
    changeTreeControl(node: DiseaseMap) {
        this.previousDataSources.push(this.dataSource.data);
        this.dataSource.data = node.diseaseMaps;
    }

    /**
     * Zoom out
     */
    previousTreeControl() {
        if (this.previousDataSources.length > 0) {
            this.dataSource.data = this.previousDataSources.pop();
        }
    }

    ngOnInit() {
        this.windowWidth = window.innerWidth;
        this.id = +this.route.snapshot.paramMap.get('diseaseBranchId');
        this.diseaseMapService.getAllDiseaseMap(this.id)
            .subscribe(diseaseMaps => this.dataSource.data = diseaseMaps);
        this.diseaseMapService.getDiseaseBranch(this.id)
            .subscribe(diseaseBranch => this.diseaseBranch = diseaseBranch);
    }

    previousState() {
        this.router.navigate(['../../'], { relativeTo: this.route });
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
            data: { name: '' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                const diseaseMap: DiseaseMap = new DiseaseMap();
                diseaseMap.name = result;
                this.diseaseMapService
                    .attachDiseaseMapToDiseaseMap(diseaseMap, this.data.diseaseMap.id).subscribe();
                console.log('The dialog was closed');
            }
        });
    }

    associateWithDiseaseXiAn(): void {
        const dialogRef = this.dialog.open(DiseaseMapAssociateDialogComponent, {
            data: {
                input: true,
                title: '项目关联',
                description: '输入项目ID:',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.diseaseMapService
                    .associateWithDiseaseXiAn(this.data.diseaseMap.id, result).subscribe();
                console.log('The dialog was closed');
            }
        });
    }

    modifyDiseaseMap(): void {
        const dialogRef = this.dialog.open(DiseaseMapAssociateDialogComponent, {
            data: {
                input: true,
                title: '更改地图名称',
                description: '输入要更改的名称:',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.data.diseaseMap.name = result;
                this.diseaseMapService
                    .modifyDiseaseMap(this.data.diseaseMap).subscribe();
                console.log('The dialog was closed');
            }
        });
    }

    associateWithQArobot(): void {
        const dialogRef = this.dialog.open(DiseaseMapAssociateDialogComponent, {
            data: {
                input: true,
                title: 'QA关联',
                description: '输入QA的ID:',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.diseaseMapService
                    .associateWithQArobot(this.data.diseaseMap.id, result).subscribe();
                console.log('The dialog was closed');
            }
        });
    }

    deleteDiseaseMap(): void {
        const dialogRef = this.dialog.open(DiseaseMapDeleteDialogComponent, {
            data: {
                title: '删除地图',
                description: '确定删除?',
                id: this.data.diseaseMap.id
            }
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
        const dialogRef = this.dialog.open(DiseaseMapAssociateDialogComponent, {
            data: {
                input: true,
                title: '添加子地图',
                description: '输入子地图名:'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                const diseaseMap: DiseaseMap = new DiseaseMap();
                diseaseMap.name = result;
                this.diseaseMapService
                    .attachDiseaseMapToDiseaseBranch(diseaseMap, this.data.diseaseBranch.id).subscribe();
                console.log('The dialog was closed');
                this.animal = result;
            }
        });
    }

    modifyDiseaseBranch(): void {
        const dialogRef = this.dialog.open(DiseaseBranchModifyDialogComponent, {
            data: {
                diseaseBranch: this.data.diseaseBranch
            }
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
        , protected diseaseMapService: DiseaseMapService) {
        // this.diseaseMap.name = 'Haha';
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
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

export interface AssociateDialog {
    title?: string;
    description?: string;
    id?: number;
    input?: boolean;
}

@Component({
    selector: 'jhi-disease-map-associate-dialog',
    templateUrl: './disease-map-associate-dialog.component.html',
})
export class DiseaseMapAssociateDialogComponent implements OnInit {

    diseaseMap: IDiseaseMap;

    constructor(
        public dialogRef: MatDialogRef<DiseaseMapAssociateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected diseaseMapService: DiseaseMapService) {
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}

@Component({
    selector: 'jhi-disease-branch-modify-dialog',
    templateUrl: './disease-branch-modify-dialog.component.html',
})
export class DiseaseBranchModifyDialogComponent implements OnInit {

    diseaseBranch: IDiseaseBranch;

    constructor(
        public dialogRef: MatDialogRef<DiseaseBranchModifyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected diseaseMapService: DiseaseMapService) {
    }

    ngOnInit(): void {
        this.diseaseBranch = this.data.diseaseBranch;
    }

    submit() {
        this.diseaseMapService
            .modifyDiseaseBranch(this.diseaseBranch).subscribe(any => this.onNoClick());
        console.log('The dialog was closed');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}

@Component({
    selector: 'jhi-disease-map-delete-dialog',
    templateUrl: './disease-map-delete-dialog.component.html',
})
export class DiseaseMapDeleteDialogComponent implements OnInit {

    diseaseMap: IDiseaseMap;

    constructor(
        public dialogRef: MatDialogRef<DiseaseMapDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected diseaseMapService: DiseaseMapService) {
    }

    ngOnInit(): void {
    }

    confirmDelete() {
        this.diseaseMapService
            .deleteDiseaseMap(this.data.id).subscribe(any => this.onNoClick());
        console.log('The dialog was closed');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}

@Component({
    selector: 'jhi-disease-xi-an-delete-dialog',
    templateUrl: './disease-map-delete-dialog.component.html',
})
export class DiseaseXiAnDeleteDialogComponent implements OnInit {

    diseaseMap: IDiseaseMap;

    constructor(
        public dialogRef: MatDialogRef<DiseaseXiAnDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected diseaseMapService: DiseaseMapService) {
    }

    ngOnInit(): void {
    }

    confirmDelete() {
        this.diseaseMapService
            .deassociateWithDiseaseXiAn(this.data.diseaseMapId, this.data.diseaseXiAnId).subscribe(any => this.onNoClick());
        console.log('The dialog was closed');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}

@Component({
    selector: 'jhi-q-arobot-delete-dialog',
    templateUrl: './disease-map-delete-dialog.component.html',
})
export class QArobotDeleteDialogComponent implements OnInit {

    diseaseMap: IDiseaseMap;

    constructor(
        public dialogRef: MatDialogRef<DiseaseMapDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        , protected diseaseMapService: DiseaseMapService) {
    }

    ngOnInit(): void {
    }

    confirmDelete() {
        this.diseaseMapService
            .deassociateWithQArobot(this.data.diseaseMapId, this.data.qArobotId).subscribe(any => this.onNoClick());
        console.log('The dialog was closed');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    previousState() {
        window.history.back();
    }

}
