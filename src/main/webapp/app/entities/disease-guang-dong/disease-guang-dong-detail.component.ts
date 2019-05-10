import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';

@Component({
    selector: 'jhi-disease-guang-dong-detail',
    templateUrl: './disease-guang-dong-detail.component.html',
    styleUrls: ['disease-guang-dong-detail.component.css']
})
export class DiseaseGuangDongDetailComponent implements OnInit {
    diseaseGuangDong: IDiseaseGuangDong;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diseaseGuangDong }) => {
            this.diseaseGuangDong = diseaseGuangDong;
        });
    }

    previousState() {
        window.history.back();
    }
}
