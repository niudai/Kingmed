import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IDiseaseXiAn, DiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

@Component({
  selector: 'jhi-disease-xi-an-prices',
  templateUrl: './disease-xi-an-prices.component.html',
  styles: []
})
export class DiseaseXiAnPricesComponent implements OnInit {
    diseaseXiAn: IDiseaseXiAn;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        // this.diseaseXiAn = new DiseaseXiAn();
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => { this.diseaseXiAn = diseaseXiAn;
        });
    }

    previousState() {
        window.history.back();
    }

}
