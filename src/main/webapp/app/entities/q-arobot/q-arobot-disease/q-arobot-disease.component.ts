import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

@Component({
    selector: 'jhi-q-arobot-disease',
    templateUrl: './q-arobot-disease.component.html',
    styles: []
})
export class QArobotDiseaseComponent implements OnInit {
    diseaseXiAns: IDiseaseXiAn[];

    constructor(protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({diseaseXiAns}) =>
            this.diseaseXiAns = diseaseXiAns);
    }

    previousState() {
        window.history.back();
    }
}
