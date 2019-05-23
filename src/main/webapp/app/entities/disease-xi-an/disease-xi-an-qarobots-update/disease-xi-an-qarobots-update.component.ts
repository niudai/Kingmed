import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';
import { activateRoute } from 'app/account';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-disease-xi-an-qarobots-update',
    templateUrl: './disease-xi-an-qarobots-update.component.html',
    styles: []
})
export class DiseaseXiAnQarobotsUpdateComponent implements OnInit {
    diseaseId: number;
    qarobotId: number;
    constructor(protected activatedRoute: ActivatedRoute
        , protected diseaseXiAnService: DiseaseXiAnService) {

     }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('diseaseId');
    }

    save() {
        this.diseaseXiAnService.associate(this.diseaseId, this.qarobotId).subscribe(
            any => this.previousState()
        );
    }

    previousState() {
        window.history.back();
    }
}
