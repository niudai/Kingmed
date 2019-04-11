/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { QArobotDetailComponent } from 'app/entities/q-arobot/q-arobot-detail.component';
import { QArobot } from 'app/shared/model/q-arobot.model';

describe('Component Tests', () => {
    describe('QArobot Management Detail Component', () => {
        let comp: QArobotDetailComponent;
        let fixture: ComponentFixture<QArobotDetailComponent>;
        const route = ({ data: of({ qArobot: new QArobot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [QArobotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QArobotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QArobotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.qArobot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
