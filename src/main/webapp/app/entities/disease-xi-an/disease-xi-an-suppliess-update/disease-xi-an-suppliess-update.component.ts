import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiseaseXiAnService } from '..';

@Component({
  selector: 'jhi-disease-xi-an-suppliess-update',
  templateUrl: './disease-xi-an-suppliess-update.component.html',
  styles: []
})
export class DiseaseXiAnSuppliessUpdateComponent implements OnInit {

    diseaseId: number;
    suppliesId: number;
    constructor(protected activatedRoute: ActivatedRoute
        , protected diseaseXiAnService: DiseaseXiAnService) {

     }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('diseaseId');
    }

    save() {
        this.diseaseXiAnService.associateWithSupplies(this.diseaseId, this.suppliesId).subscribe(
            any => this.previousState()
        );
    }

    previousState() {
        window.history.back();
    }
}
