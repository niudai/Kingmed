import { MatButtonModule, MatTreeModule, MatCardModule, MatIconModule, MatBottomSheetModule, MatListModule, MatAutocompleteModule, MatBadgeModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
        , MatListModule
        , CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
    ]
})
export class JhipsterElasticsearchSampleApplicationSharedLibsModule {
    static forRoot() {
        return {
            ngModule: JhipsterElasticsearchSampleApplicationSharedLibsModule
        };
    }
}
