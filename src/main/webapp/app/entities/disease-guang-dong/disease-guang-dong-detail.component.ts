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
    checkDemandsIsOpen: boolean; // 送检需求
    checkAboutIsOpen: boolean; // 检测相关
    sampleAndSuppliesIsOpen: boolean; // 样品及耗材
    clinicalApplicationIsOpen: boolean; // 临床应用
    remarkIsOpen: boolean; // 备注

    checkDemandsIsOpenToggle() {
        this.checkDemandsIsOpen = !this.checkDemandsIsOpen;
    }

    checkAboutIsOpenToggle() {
        this.checkAboutIsOpen = !this.checkAboutIsOpen;
    }

    sampleAndSuppliesIsOpenToggle() {
        this.sampleAndSuppliesIsOpen = !this.sampleAndSuppliesIsOpen;
    }

    clinicalApplicationIsOpenToggle() {
        this.clinicalApplicationIsOpen = !this.clinicalApplicationIsOpen;
    }

    remarkIsOpenToggle() {
        this.remarkIsOpen = !this.remarkIsOpen;
    }

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diseaseGuangDong }) => {
            this.diseaseGuangDong = diseaseGuangDong;
        });
        this.checkDemandsIsOpen = true;
    }

    previousState() {
        window.history.back();
    }
}
