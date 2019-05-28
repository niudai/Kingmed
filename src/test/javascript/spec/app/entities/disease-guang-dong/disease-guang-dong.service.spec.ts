/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DiseaseGuangDongService } from 'app/entities/disease-guang-dong/disease-guang-dong.service';
import { IDiseaseGuangDong, DiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';

describe('Service Tests', () => {
    describe('DiseaseGuangDong Service', () => {
        let injector: TestBed;
        let service: DiseaseGuangDongService;
        let httpMock: HttpTestingController;
        let elemDefault: IDiseaseGuangDong;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DiseaseGuangDongService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DiseaseGuangDong(
                0,
                'AAAAAAA',
                null,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a DiseaseGuangDong', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DiseaseGuangDong(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DiseaseGuangDong', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        subsidiary: 'BBBBBB',
                        supplement: 'BBBBBB',
                        testMethod: 'BBBBBB',
                        sample: 'BBBBBB',
                        roomPreservation: 'BBBBBB',
                        coldStoragePreservation: 'BBBBBB',
                        freezing: 'BBBBBB',
                        clinicalApplication: 'BBBBBB',
                        tollStandard: 'BBBBBB',
                        reportingTime: 'BBBBBB',
                        remarks: 'BBBBBB',
                        chargeCode: 'BBBBBB',
                        classification: 'BBBBBB',
                        applicationUnitType: 'BBBBBB',
                        series: 'BBBBBB',
                        projectChangeNotification: 'BBBBBB',
                        specialInspectionItems: 'BBBBBB',
                        stopDeveloping: 'BBBBBB',
                        projectConcourse: 'BBBBBB',
                        testDepartment: 'BBBBBB',
                        suppliesSeries: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of DiseaseGuangDong', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        subsidiary: 'BBBBBB',
                        supplement: 'BBBBBB',
                        testMethod: 'BBBBBB',
                        sample: 'BBBBBB',
                        roomPreservation: 'BBBBBB',
                        coldStoragePreservation: 'BBBBBB',
                        freezing: 'BBBBBB',
                        clinicalApplication: 'BBBBBB',
                        tollStandard: 'BBBBBB',
                        reportingTime: 'BBBBBB',
                        remarks: 'BBBBBB',
                        chargeCode: 'BBBBBB',
                        classification: 'BBBBBB',
                        applicationUnitType: 'BBBBBB',
                        series: 'BBBBBB',
                        projectChangeNotification: 'BBBBBB',
                        specialInspectionItems: 'BBBBBB',
                        stopDeveloping: 'BBBBBB',
                        projectConcourse: 'BBBBBB',
                        testDepartment: 'BBBBBB',
                        suppliesSeries: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a DiseaseGuangDong', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
