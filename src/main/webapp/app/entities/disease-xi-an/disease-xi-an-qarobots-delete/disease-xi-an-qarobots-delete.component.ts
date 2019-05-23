import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseXiAnService } from '..';

@Component({
  selector: 'jhi-disease-xi-an-qarobots-delete',
  templateUrl: './disease-xi-an-qarobots-delete.component.html',
  styles: []
})
export class DiseaseXiAnQarobotsDeleteComponent implements OnInit {

  diseaseId: number;
  qarobotId: number;
  constructor(private router: Router,
      private activatedRoute: ActivatedRoute,
      private diseaseXiAnService: DiseaseXiAnService) {
  }

  ngOnInit() {
      this.diseaseId = +this.activatedRoute.snapshot.paramMap.get('diseaseId');
      this.qarobotId = +this.activatedRoute.snapshot.paramMap.get('qarobotId');
  }

  cancel() {
      this.closePopup();
  }

  confirmDelete() {
      this.diseaseXiAnService.deassociate(this.diseaseId, this.qarobotId).subscribe();
      this.closePopup();
  }

  closePopup() {
      window.history.back();
      // this.router.navigate([{ outlets: { pricePopup: null } }]);
  }
}
