import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account, AccountService, UserService } from 'app/core';
import { DiseaseBranchDeleteModalComponent } from 'app/disease-map/disease-branch/disease-branch.component';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { MyMapDeleteDialogComponent } from './my-map-delete-dialog/my-map-delete-dialog.component';

@Component({
  selector: 'jhi-my-map',
  templateUrl: './my-map.component.html',
  styles: []
})
export class MyMapComponent implements OnInit {

    currentAccount: Account;
    diseaseBranches: IDiseaseBranch[];

    constructor(
        protected userService: UserService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected matDialog: MatDialog,
        protected modalService: NgbModal,
        protected dialog: MatDialog,
        protected _bottomSheet: MatBottomSheet
    ) {}

    loadAll() {
        this.userService
            .getDiseaseBranches(this.currentAccount.login)
                .subscribe(
                    res => this.diseaseBranches = res
            );
        return;
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });
    }

    open(diseaseBranch: IDiseaseBranch) {
        const dialogRef = this.dialog.open(MyMapDeleteDialogComponent, {
            width: '500px',
            data: { diseaseBranch }
        });
        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });
    }

    trackId(index: number, item: IDiseaseXiAn) {
        return item.id;
    }

}
