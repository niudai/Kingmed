import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateComponent } from 'app/entities/disease-xi-an/concourse/create-dialog/create-dialog.component';
import { IHelpLink } from 'app/shared/model/help-link.model';
import { HelpLinkService } from 'app/shared/service/help-link.service';

@Component({
    selector: 'jhi-help-link',
    templateUrl: './help-link.component.html',
    styles: []
})
export class HelpLinkComponent implements OnInit {
    helpLinks: IHelpLink[];

    constructor(protected service: HelpLinkService, protected dialog: MatDialog, protected snackbar: MatSnackBar) {}

    loadHelpLinks() {
        this.service.get().subscribe(res => {
            this.helpLinks = res;
        });
    }

    save() {
        this.service.update(this.helpLinks[0]).subscribe(any => this.snackbar.open('更新成功', null, { duration: 1000 }));
    }

    ngOnInit() {
        this.loadHelpLinks();
    }
}
