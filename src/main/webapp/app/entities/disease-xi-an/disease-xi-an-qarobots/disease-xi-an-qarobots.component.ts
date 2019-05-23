import { IQArobot } from 'app/shared/model/q-arobot.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { activateRoute } from 'app/account';

@Component({
    selector: 'jhi-disease-xi-an-qarobots',
    templateUrl: './disease-xi-an-qarobots.component.html',
    styles: []
})
export class DiseaseXiAnQarobotsComponent implements OnInit {
    qarobots: IQArobot[];
    diseaseId: number;
    constructor(protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('id');
        this.activatedRoute.data.subscribe(({ qarobots }) => { this.qarobots = qarobots;
        });
    }

    previousState() {
        window.history.back();
    }

}
