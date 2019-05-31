import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiseaseXiAnService } from '..';

@Component({
  selector: 'jhi-disease-xi-an-applications-update',
  templateUrl: './disease-xi-an-applications-update.component.html',
  styles: []
})
export class DiseaseXiAnApplicationsUpdateComponent implements OnInit {

    diseaseId: number;
    applicationId: number;
    constructor(protected activatedRoute: ActivatedRoute
        , protected diseaseXiAnService: DiseaseXiAnService) {

     }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('diseaseId');
    }

    save() {
        this.diseaseXiAnService.associateWithApplication(this.diseaseId, this.applicationId).subscribe(
            any => this.previousState()
        );
    }

    previousState() {
        window.history.back();
    }

}
