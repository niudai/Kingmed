import { IFile } from './../../../shared/model/file.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiseaseXiAnService } from '../disease-xi-an.service';

@Component({
  selector: 'jhi-disease-xi-an-applications',
  templateUrl: './disease-xi-an-applications.component.html',
  styles: []
})
export class DiseaseXiAnApplicationsComponent implements OnInit {

    applications: IFile[];
    diseaseId: number;
    constructor(protected activatedRoute: ActivatedRoute
        , protected diseaseXiAnService: DiseaseXiAnService) { }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('id');
        this.diseaseXiAnService.getApplications(this.diseaseId).subscribe(
            any => this.applications = any.body
        );
    }

    previousState() {
        window.history.back();
    }

}
