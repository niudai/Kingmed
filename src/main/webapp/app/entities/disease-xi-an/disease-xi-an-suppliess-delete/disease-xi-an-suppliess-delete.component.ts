import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseaseXiAnService } from '..';

@Component({
    selector: 'jhi-disease-xi-an-suppliess-delete',
    templateUrl: './disease-xi-an-suppliess-delete.component.html',
    styles: []
})
export class DiseaseXiAnSuppliessDeleteComponent implements OnInit {

    diseaseId: number;
    suppliesId: number;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private diseaseXiAnService: DiseaseXiAnService) {
    }

    ngOnInit() {
        this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('diseaseId');
        this.suppliesId = +this.activatedRoute.snapshot.paramMap.get('suppliesId');
    }

    cancel() {
        this.closePopup();
    }

    confirmDelete() {
        this.diseaseXiAnService.deassociateWithSupplies(this.diseaseId, this.suppliesId).subscribe();
        this.closePopup();
    }

    closePopup() {
        window.history.back();
    }

}
