/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DiseaseGuangDongComponentsPage, DiseaseGuangDongDeleteDialog, DiseaseGuangDongUpdatePage } from './disease-guang-dong.page-object';

const expect = chai.expect;

describe('DiseaseGuangDong e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let diseaseGuangDongUpdatePage: DiseaseGuangDongUpdatePage;
    let diseaseGuangDongComponentsPage: DiseaseGuangDongComponentsPage;
    let diseaseGuangDongDeleteDialog: DiseaseGuangDongDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DiseaseGuangDongs', async () => {
        await navBarPage.goToEntity('disease-guang-dong');
        diseaseGuangDongComponentsPage = new DiseaseGuangDongComponentsPage();
        await browser.wait(ec.visibilityOf(diseaseGuangDongComponentsPage.title), 5000);
        expect(await diseaseGuangDongComponentsPage.getTitle()).to.eq(
            'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        );
    });

    it('should load create DiseaseGuangDong page', async () => {
        await diseaseGuangDongComponentsPage.clickOnCreateButton();
        diseaseGuangDongUpdatePage = new DiseaseGuangDongUpdatePage();
        expect(await diseaseGuangDongUpdatePage.getPageTitle()).to.eq(
            'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.createOrEditLabel'
        );
        await diseaseGuangDongUpdatePage.cancel();
    });

    it('should create and save DiseaseGuangDongs', async () => {
        const nbButtonsBeforeCreate = await diseaseGuangDongComponentsPage.countDeleteButtons();

        await diseaseGuangDongComponentsPage.clickOnCreateButton();
        await promise.all([
            diseaseGuangDongUpdatePage.setNameInput('name'),
            diseaseGuangDongUpdatePage.setSubsidiaryInput('subsidiary'),
            diseaseGuangDongUpdatePage.setSupplementInput('supplement'),
            diseaseGuangDongUpdatePage.setTestMethodInput('testMethod'),
            diseaseGuangDongUpdatePage.setSampleInput('sample'),
            diseaseGuangDongUpdatePage.setRoomPreservationInput('roomPreservation'),
            diseaseGuangDongUpdatePage.setColdStoragePreservationInput('coldStoragePreservation'),
            diseaseGuangDongUpdatePage.setFreezingInput('freezing'),
            diseaseGuangDongUpdatePage.setClinicalApplicationInput('clinicalApplication'),
            diseaseGuangDongUpdatePage.setTollStandardInput('tollStandard'),
            diseaseGuangDongUpdatePage.setReportingTimeInput('reportingTime'),
            diseaseGuangDongUpdatePage.setRemarksInput('remarks'),
            diseaseGuangDongUpdatePage.setChargeCodeInput('chargeCode'),
            diseaseGuangDongUpdatePage.setClassificationInput('classification'),
            diseaseGuangDongUpdatePage.setApplicationUnitTypeInput('applicationUnitType'),
            diseaseGuangDongUpdatePage.setSeriesInput('series'),
            diseaseGuangDongUpdatePage.setProjectChangeNotificationInput('projectChangeNotification'),
            diseaseGuangDongUpdatePage.setSpecialInspectionItemsInput('specialInspectionItems'),
            diseaseGuangDongUpdatePage.setStopDevelopingInput('stopDeveloping'),
            diseaseGuangDongUpdatePage.setProjectConcourseInput('projectConcourse'),
            diseaseGuangDongUpdatePage.setTestDepartmentInput('testDepartment'),
            diseaseGuangDongUpdatePage.setSuppliesSeriesInput('suppliesSeries')
        ]);
        expect(await diseaseGuangDongUpdatePage.getNameInput()).to.eq('name');
        expect(await diseaseGuangDongUpdatePage.getSubsidiaryInput()).to.eq('subsidiary');
        expect(await diseaseGuangDongUpdatePage.getSupplementInput()).to.eq('supplement');
        expect(await diseaseGuangDongUpdatePage.getTestMethodInput()).to.eq('testMethod');
        expect(await diseaseGuangDongUpdatePage.getSampleInput()).to.eq('sample');
        expect(await diseaseGuangDongUpdatePage.getRoomPreservationInput()).to.eq('roomPreservation');
        expect(await diseaseGuangDongUpdatePage.getColdStoragePreservationInput()).to.eq('coldStoragePreservation');
        expect(await diseaseGuangDongUpdatePage.getFreezingInput()).to.eq('freezing');
        expect(await diseaseGuangDongUpdatePage.getClinicalApplicationInput()).to.eq('clinicalApplication');
        expect(await diseaseGuangDongUpdatePage.getTollStandardInput()).to.eq('tollStandard');
        expect(await diseaseGuangDongUpdatePage.getReportingTimeInput()).to.eq('reportingTime');
        expect(await diseaseGuangDongUpdatePage.getRemarksInput()).to.eq('remarks');
        expect(await diseaseGuangDongUpdatePage.getChargeCodeInput()).to.eq('chargeCode');
        expect(await diseaseGuangDongUpdatePage.getClassificationInput()).to.eq('classification');
        expect(await diseaseGuangDongUpdatePage.getApplicationUnitTypeInput()).to.eq('applicationUnitType');
        expect(await diseaseGuangDongUpdatePage.getSeriesInput()).to.eq('series');
        expect(await diseaseGuangDongUpdatePage.getProjectChangeNotificationInput()).to.eq('projectChangeNotification');
        expect(await diseaseGuangDongUpdatePage.getSpecialInspectionItemsInput()).to.eq('specialInspectionItems');
        expect(await diseaseGuangDongUpdatePage.getStopDevelopingInput()).to.eq('stopDeveloping');
        expect(await diseaseGuangDongUpdatePage.getProjectConcourseInput()).to.eq('projectConcourse');
        expect(await diseaseGuangDongUpdatePage.getTestDepartmentInput()).to.eq('testDepartment');
        expect(await diseaseGuangDongUpdatePage.getSuppliesSeriesInput()).to.eq('suppliesSeries');
        await diseaseGuangDongUpdatePage.save();
        expect(await diseaseGuangDongUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await diseaseGuangDongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DiseaseGuangDong', async () => {
        const nbButtonsBeforeDelete = await diseaseGuangDongComponentsPage.countDeleteButtons();
        await diseaseGuangDongComponentsPage.clickOnLastDeleteButton();

        diseaseGuangDongDeleteDialog = new DiseaseGuangDongDeleteDialog();
        expect(await diseaseGuangDongDeleteDialog.getDialogTitle()).to.eq(
            'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.delete.question'
        );
        await diseaseGuangDongDeleteDialog.clickOnConfirmButton();

        expect(await diseaseGuangDongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
