import { QArobotService } from 'app/entities/q-arobot/q-arobot.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQArobot } from 'app/shared/model/q-arobot.model';
import { MatDialog } from '@angular/material';
import { QArobotDeleteDialogComponent } from '.';

export interface DialogData {
    qArobot: IQArobot;
}

@Component({
    selector: 'jhi-q-arobot-detail',
    templateUrl: './q-arobot-detail.component.html',
    styleUrls: ['./q-arobot-detail.component.css']
})
export class QArobotDetailComponent implements OnInit {
    animal: string;
     name: string;

    questionAboutIsOpen: boolean;
    answerIsOpen: boolean;

    qArobot: IQArobot;

    constructor(protected activatedRoute: ActivatedRoute
            , public dialog: MatDialog
            , public qArobotService: QArobotService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qArobot }) => {
            this.qArobot = qArobot;
        });
    }

    openDialog(qArobot: IQArobot): void {
        const dialogRef = this.dialog.open(QArobotDeleteDialogComponent, {
          width: '250px',
          data: {qArobot: this.qArobot}
        });

        dialogRef.afterClosed().subscribe(result => {
          window.history.back();
        });
    }

    answerToggle() {
        this.answerIsOpen = !this.answerIsOpen;
    }

    questionAboutToggle() {
        this.questionAboutIsOpen = !this.questionAboutIsOpen;
    }

    previousState() {
        window.history.back();
    }
}
