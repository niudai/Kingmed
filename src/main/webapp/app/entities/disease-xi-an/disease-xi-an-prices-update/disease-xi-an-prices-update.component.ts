import { IPriceXiAn } from './../../../shared/model/price-xi-an.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPrice} from './../../../shared/model/price.model';
import { activateRoute } from './../../../account/activate/activate.route';
import { DiseaseXiAnService } from './../disease-xi-an.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-disease-xi-an-prices-update',
  templateUrl: './disease-xi-an-prices-update.component.html',
  styles: []
})
export class DiseaseXiAnPricesUpdateComponent implements OnInit {
  id: number; // id of diseaseXiAn
  price: IPriceXiAn;
  isSaving: boolean;

  constructor(protected diseaseXiAnService: DiseaseXiAnService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router) {
  }

  ngOnInit() {
      this.isSaving = false;
      this.activatedRoute.data.subscribe(({ price }) => {
        this.price = price;
      });
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  previousState() {
      window.history.back();
  }

  save() {
      this.isSaving = true;
      if (this.price.id === undefined) {
          this.diseaseXiAnService.addNewPrice(this.id, this.price)
            .subscribe((res: HttpResponse<IPrice>) => this.onSaveSuccess()
                , (res: HttpErrorResponse) => this.onSaveError());
      } else {
            this.diseaseXiAnService.updatePrice(this.price)
             .subscribe((res: HttpResponse<IPrice>) => this.onSaveSuccess()
                , (res: HttpErrorResponse) => this.onSaveError());
      }
  }

  protected onSaveSuccess() {
      this.isSaving = false;
      this.previousState();
  }

  protected onSaveError() {
      this.isSaving = false;
  }

}
