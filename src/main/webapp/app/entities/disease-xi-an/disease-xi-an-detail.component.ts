import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';
import { ActivateComponent } from './../../account/activate/activate.component';
import { PriceXiAn } from './../../shared/model/price-xi-an.model';
import { Price } from './../../shared/model/price.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { JhiTranslateComponent } from 'ng-jhipster';

@Component({
    selector: 'jhi-disease-xi-an-detail',
    templateUrl: './disease-xi-an-detail.component.html',
    styleUrls: ['disease-xi-an-detail.component.css']
})
export class DiseaseXiAnDetailComponent implements OnInit {
    activatedToggleLabel: string;
    diseaseAboutIsOpen: boolean;
    projectAndPriceIsOpen: boolean;
    checkDemandsIsOpen: boolean;
    tatAboutIsOpen: boolean;
    remarkIsOpen: boolean;
    clinicalApplicationIsOpen: boolean; // 临床应用
    diseaseXiAn: IDiseaseXiAn;

    currentPrice: string;
    currentChargeCode: string;
    currentReportingTime: string;
    currentSubseries: string;

    constructor(protected activatedRoute: ActivatedRoute
        , protected diseaseXiAnService: DiseaseXiAnService
        , protected jhiTranslate: JhiTranslateComponent) {}

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

    clinicalApplicationIsOpenToggle() {
        this.clinicalApplicationIsOpen = !this.clinicalApplicationIsOpen;
    }

    diseaseAboutIsOpenToggle() {
        this.diseaseAboutIsOpen = !this.diseaseAboutIsOpen;
    }

    activateDiseaseXiAn() {
        this.diseaseXiAn.activated = !this.diseaseXiAn.activated;
        this.activatedToggleLabel = this.diseaseXiAn.activated ? '正常运行' : '暂停运行';
        this.diseaseXiAnService.activate(this.diseaseXiAn.id, this.diseaseXiAn.activated)
            .subscribe();
    }

    ngOnInit() {
        this.projectAndPriceIsOpen = true;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
        });
        this.activatedToggleLabel = this.diseaseXiAn.activated ? '运行' : '已停用';
        this.currentChargeCode = this.diseaseXiAn.chargeCode;
        this.currentPrice = this.diseaseXiAn.tollStandard;
        this.currentReportingTime = this.diseaseXiAn.reportingTime;
        this.currentSubseries = this.currentSubseries;
    }

    public currentToggle(price: PriceXiAn): void {
        this.currentPrice = price.tollStandard;
        this.currentChargeCode = price.chargeCode;
        this.currentReportingTime = price.reportingTime;
        this.currentSubseries = price.subseries;
    }

    public currentDefault(): void {
        this.currentPrice = this.diseaseXiAn.tollStandard;
        this.currentChargeCode = this.diseaseXiAn.chargeCode;
        this.currentReportingTime = this.diseaseXiAn.reportingTime;
        this.currentSubseries = this.diseaseXiAn.subSeries;
    }

    previousState() {
        window.history.back();
    }

}
