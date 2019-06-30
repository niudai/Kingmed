import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule, MatTreeModule, MatCardModule, MatIconModule, MatListModule, MatBottomSheetModule, MatDialogModule, MatInputModule, MatMenuModule } from '@angular/material';

@NgModule({
    imports: [
        NgbModule.forRoot(), InfiniteScrollModule, CookieModule.forRoot(), FontAwesomeModule],
    exports: [
        FormsModule
        , CommonModule
        , NgbModule
        , NgJhipsterModule
        , InfiniteScrollModule
        , FontAwesomeModule
        , MatButtonModule
        , MatTreeModule
        , MatCardModule
        , MatIconModule
        , MatBottomSheetModule
        , MatListModule,
        CdkTableModule,
        CdkTreeModule,
        // MatAutocompleteModule,
        // MatBadgeModule,
        MatBottomSheetModule,
        MatCardModule,
        // MatCheckboxModule,
        // MatDatepickerModule,
        MatDialogModule,
        // MatChipsModule,
        // MatStepperModule,
        // MatDividerModule,
        // MatExpansionModule,
        // MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        // MatNativeDateModule,
        // MatPaginatorModule,
        // MatProgressBarModule,
        // MatProgressSpinnerModule,
        // MatRadioModule,
        // MatRippleModule,
        // MatSelectModule,
        // MatSidenavModule,
        // MatSliderModule,
        // MatSlideToggleModule,
        // MatSnackBarModule,
        // MatSortModule,
        // MatTableModule,
        // MatTabsModule,
        // MatToolbarModule,
        // MatTooltipModule,
        MatTreeModule,
        // PortalModule,
        // ScrollingModule,
    ]
})
export class JhipsterElasticsearchSampleApplicationSharedLibsModule {
    static forRoot() {
        return {
            ngModule: JhipsterElasticsearchSampleApplicationSharedLibsModule
        };
    }
}
