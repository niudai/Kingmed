import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseaseXiAnService } from '..';

@Component({
  selector: 'jhi-disease-xi-an-applications-delete',
  templateUrl: './disease-xi-an-applications-delete.component.html',
  styles: []
})
export class DiseaseXiAnApplicationsDeleteComponent implements OnInit {

    diseaseId: number;
    applicationId: number;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private diseaseXiAnService: DiseaseXiAnService) {
    }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('diseaseId');
        this.applicationId = +this.activatedRoute.snapshot.paramMap.get('applicationId');
    }

    cancel() {
        this.closePopup();
    }

    confirmDelete() {
        this.diseaseXiAnService.deassociateWithApplication(this.diseaseId, this.applicationId).subscribe();
        this.closePopup();
    }

    closePopup() {
        window.history.back();
        // this.router.navigate([{ outlets: { pricePopup: null } }]);
    }

}
