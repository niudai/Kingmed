import { activateRoute } from './../../../account/activate/activate.route';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IDiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';

@Component({
  selector: 'jhi-disease-guang-dong-prices',
  templateUrl: './disease-guang-dong-prices.component.html',
  styles: []
})
export class DiseaseGuangDongPricesComponent implements OnInit {
    diseaseGuangDong: IDiseaseGuangDong;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diseaseGuangDong }) => { this.diseaseGuangDong = diseaseGuangDong;
        });
    }

    previousState() {
        window.history.back();
    }

}
