import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQArobot } from 'app/shared/model/q-arobot.model';

@Component({
    selector: 'jhi-q-arobot-detail',
    templateUrl: './q-arobot-detail.component.html'
})
export class QArobotDetailComponent implements OnInit {
    qArobot: IQArobot;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qArobot }) => {
            this.qArobot = qArobot;
        });
    }

    previousState() {
        window.history.back();
    }
}
