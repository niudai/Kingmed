import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'app/layouts/navbar/feedback-dialog/feedback.service';
import { IFeedback } from 'app/shared/model/feedback.model';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an';
import { UserService } from 'app/core/user/user.service';
import { AccountService, Account } from 'app/core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'jhi-index',
    templateUrl: './feedback.component.html',
    styles: []
})
export class FeedbackComponent implements OnInit {
    feedbacks: IFeedback[];
    response: any;

    constructor(
        private service: FeedbackService,
        private dialog: MatDialog) {}

    ngOnInit() {
        console.log('Begin to get feedbacks!');
        this.loadAll();
    }

    loadAll() {
        this.service.query({ sort: ['lastModifiedDate,desc'] }).subscribe(res => {
            // this.feedbacks = res._embedded.feedback;
            this.feedbacks = res.body._embedded.feedback;
            console.log(this.feedbacks);
        });
    }

    onDelete(feedback: IFeedback) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: { feedback }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });
    }

}
