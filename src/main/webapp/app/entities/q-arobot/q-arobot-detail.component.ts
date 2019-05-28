import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQArobot } from 'app/shared/model/q-arobot.model';

@Component({
    selector: 'jhi-q-arobot-detail',
    templateUrl: './q-arobot-detail.component.html',
    styleUrls: ['./q-arobot-detail.component.css']
})
export class QArobotDetailComponent implements OnInit {
    questionAboutIsOpen: boolean;
    answerIsOpen: boolean;

    qArobot: IQArobot;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.answerIsOpen = true;
        this.questionAboutIsOpen = false;
        this.activatedRoute.data.subscribe(({ qArobot }) => {
            this.qArobot = qArobot;
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
