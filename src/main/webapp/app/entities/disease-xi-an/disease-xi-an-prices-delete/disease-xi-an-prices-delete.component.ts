import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiseaseXiAnService } from '../disease-xi-an.service';

@Component({
    selector: 'jhi-disease-xi-an-prices-delete',
    templateUrl: './disease-xi-an-prices-delete.component.html',
    styles: []
})
export class DiseaseXiAnPricesDeleteComponent implements OnInit {
    id: number;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private diseaseXiAnService: DiseaseXiAnService) {
    }

    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.paramMap.get('priceId');
    }

    cancel() {
        this.closePopup();
    }

    confirmDelete() {
        this.diseaseXiAnService.deletePrice(this.id).subscribe();
        this.closePopup();
    }

    closePopup() {
        window.history.back();
        // this.router.navigate([{ outlets: { pricePopup: null } }]);
    }

}
