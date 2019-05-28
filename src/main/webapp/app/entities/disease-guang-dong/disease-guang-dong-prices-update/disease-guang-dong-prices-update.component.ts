import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPrice, Price } from './../../../shared/model/price.model';
import { activateRoute } from './../../../account/activate/activate.route';
import { DiseaseGuangDongService } from './../disease-guang-dong.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-disease-guang-dong-prices-update',
  templateUrl: './disease-guang-dong-prices-update.component.html',
  styles: []
})
export class DiseaseGuangDongPricesUpdateComponent implements OnInit {
  id: number; // id of diseaseGuangDong
  price: IPrice;
  isSaving: boolean;

  constructor(protected diseaseGuangDongService: DiseaseGuangDongService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router) {
  }

  ngOnInit() {
      this.isSaving = false;
      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.activatedRoute.data.subscribe(({ price }) => {
        this.price = price;
      });
  }

  previousState() {
      window.history.back();
  }

  save() {
      this.isSaving = true;
      if (this.price.id === undefined) {
          this.diseaseGuangDongService.addNewPrice(this.id, this.price)
            .subscribe((res: HttpResponse<IPrice>) => this.onSaveSuccess()
                , (res: HttpErrorResponse) => this.onSaveError());
      } else {
            this.diseaseGuangDongService.updatePrice(this.price)
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
