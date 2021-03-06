import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialog, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DiseaseXiAnMatDeleteDialogComponent } from '..';
import { DiseaseXiAnService } from '../disease-xi-an.service';
import { DiseaseXiAnGiveDialogComponent } from './../disease-xi-an-give-dialog/disease-xi-an-give-dialog.component';

@Component({
  selector: 'jhi-disease-xi-an-detail-bottom-sheet',
  templateUrl: './disease-xi-an-detail-bottom-sheet.component.html',
  styles: []
})
export class DiseaseXiAnDetailBottomSheetComponent {

    constructor(private _bottomSheetRef: MatBottomSheetRef<DiseaseXiAnDetailBottomSheetComponent>
        , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
        , protected dialog: MatDialog
        , protected diseaseService: DiseaseXiAnService) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    openGiveDialog(): void {
        const dialogRef = this.dialog.open(DiseaseXiAnGiveDialogComponent, {
            width: '250px',
            data: {diseaseXiAn: this.data.diseaseXiAn}
        });
        // dialogRef.afterClosed().subscribe(result => {
        //     if (result !== undefined) {
        //         const diseaseMap: DiseaseMap = new DiseaseMap();
        //         diseaseMap.name = result;
        //         this.diseaseService
        //             .attachDiseaseMapToDiseaseMap(diseaseMap, this.data.diseaseMap.id).subscribe();
        //         console.log('The dialog was closed');
        //     }
        // });
    }

    openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DiseaseXiAnMatDeleteDialogComponent, {
          width: '250px',
          data: {diseaseXiAn: this.data.diseaseXiAn}
        });
    }

}
