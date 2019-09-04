import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { DiseaseXiAnService } from '../disease-xi-an.service';

@Component({
    selector: 'jhi-comment-bottom-sheet',
    templateUrl: './comment-bottom-sheet.component.html',
    styles: []
})
export class CommentBottomSheetComponent {
    feedbackSuccessMsg = '反馈成功';

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<CommentBottomSheetComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private dialog: MatDialog,
        private diseaseXiAnService: DiseaseXiAnService,
        private _snackBar: MatSnackBar) {}

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    openCommentDialog(): void {
        const dialogRef = this.dialog.open(CommentDialogComponent, {
            width: '600px',

            data: { comment: '' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

            this.diseaseXiAnService
                .createComment(this.data.diseaseXiAn.id, result)
                .subscribe(any => this._snackBar.open(this.feedbackSuccessMsg));
            this.diseaseXiAnService
                .queryComment(this.data.diseaseXiAn.id)
                .subscribe(res => this.data.comments = res.body);
        });
    }
}
