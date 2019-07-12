import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, NZ_ICONS, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule, MatTreeModule, MatCardModule, MatIconModule, MatListModule, MatBottomSheetModule, MatDialogModule, MatInputModule, MatMenuModule, MatTooltipModule, MatSlideToggleModule, MatGridListModule, MatExpansionModule, MatRippleModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
    imports: [
        NgbModule.forRoot(), InfiniteScrollModule, CookieModule.forRoot(), FontAwesomeModule],
    exports: [
        NgZorroAntdModule,
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
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        DragDropModule,
        // MatNativeDateModule,
        MatPaginatorModule,
        // MatProgressBarModule,
        // MatProgressSpinnerModule,
        // MatRadioModule,
        MatRippleModule,
        // MatSelectModule,
        // MatSidenavModule,
        // MatSliderModule,
        MatSlideToggleModule,
        // MatSnackBarModule,
        // MatSortModule,
        MatTableModule,
        // MatTabsModule,
        // MatToolbarModule,
        MatTooltipModule,
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
