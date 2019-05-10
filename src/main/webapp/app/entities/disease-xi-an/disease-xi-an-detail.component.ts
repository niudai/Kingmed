import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

@Component({
    selector: 'jhi-disease-xi-an-detail',
    templateUrl: './disease-xi-an-detail.component.html',
    styleUrls: ['disease-xi-an-detail.component.css']
})
export class DiseaseXiAnDetailComponent implements OnInit {
    projectAndPriceIsOpen: boolean;
    checkDemandsIsOpen: boolean;
    tatAboutIsOpen: boolean;
    remarkIsOpen: boolean;
    diseaseXiAn: IDiseaseXiAn;

    constructor(protected activatedRoute: ActivatedRoute) {}

    projectAndPriceIsOpenToggle() {
        this.projectAndPriceIsOpen = !this.projectAndPriceIsOpen;
    }

    checkDemandsIsOpenToggle() {
        this.checkDemandsIsOpen = !this.checkDemandsIsOpen;
    }

    tatAboutIsOpenToggle() {
        this.tatAboutIsOpen = !this.tatAboutIsOpen;
    }

    remarkIsOpenToggle() {
        this.remarkIsOpen = !this.remarkIsOpen;
    }

    ngOnInit() {
        this.projectAndPriceIsOpen = true;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
        });
    }

    previousState() {
        window.history.back();
    }
}
