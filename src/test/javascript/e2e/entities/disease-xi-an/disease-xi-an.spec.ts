/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DiseaseXiAnComponentsPage, DiseaseXiAnDeleteDialog, DiseaseXiAnUpdatePage } from './disease-xi-an.page-object';

const expect = chai.expect;

describe('DiseaseXiAn e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let diseaseXiAnUpdatePage: DiseaseXiAnUpdatePage;
    let diseaseXiAnComponentsPage: DiseaseXiAnComponentsPage;
    let diseaseXiAnDeleteDialog: DiseaseXiAnDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DiseaseXiAns', async () => {
        await navBarPage.goToEntity('disease-xi-an');
        diseaseXiAnComponentsPage = new DiseaseXiAnComponentsPage();
        await browser.wait(ec.visibilityOf(diseaseXiAnComponentsPage.title), 5000);
        expect(await diseaseXiAnComponentsPage.getTitle()).to.eq('jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title');
    });

    it('should load create DiseaseXiAn page', async () => {
        await diseaseXiAnComponentsPage.clickOnCreateButton();
        diseaseXiAnUpdatePage = new DiseaseXiAnUpdatePage();
        expect(await diseaseXiAnUpdatePage.getPageTitle()).to.eq(
            'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.createOrEditLabel'
        );
        await diseaseXiAnUpdatePage.cancel();
    });

    it('should create and save DiseaseXiAns', async () => {
        const nbButtonsBeforeCreate = await diseaseXiAnComponentsPage.countDeleteButtons();

        await diseaseXiAnComponentsPage.clickOnCreateButton();
        await promise.all([
            diseaseXiAnUpdatePage.setSubsidiaryInput('subsidiary'),
            diseaseXiAnUpdatePage.setNameInput('name'),
            diseaseXiAnUpdatePage.setProjectCodeInput('projectCode'),
            diseaseXiAnUpdatePage.setChargeCodeInput('chargeCode'),
            diseaseXiAnUpdatePage.setTollStandardInput('tollStandard'),
            diseaseXiAnUpdatePage.setSupplementInput('supplement'),
            diseaseXiAnUpdatePage.setSampleInput('sample'),
            diseaseXiAnUpdatePage.setTutorialInput('tutorial'),
            diseaseXiAnUpdatePage.setPreservationInput('preservation'),
            diseaseXiAnUpdatePage.setTransportationInput('transportation'),
            diseaseXiAnUpdatePage.setApplicationUnitTypeInput('applicationUnitType'),
            diseaseXiAnUpdatePage.setApplicationRemarkInput('applicationRemark'),
            diseaseXiAnUpdatePage.setMedicalMethodInput('medicalMethod'),
            diseaseXiAnUpdatePage.setProjectConcourseInput('projectConcourse'),
            diseaseXiAnUpdatePage.setHurryDepartmentInput('hurryDepartment'),
            diseaseXiAnUpdatePage.setReportingTimeInput('reportingTime'),
            diseaseXiAnUpdatePage.setClinicalApplicationInput('clinicalApplication'),
            diseaseXiAnUpdatePage.setSeriesInput('series'),
            diseaseXiAnUpdatePage.setSubSeriesInput('subSeries'),
            diseaseXiAnUpdatePage.setRemarksInput('remarks')
        ]);
        expect(await diseaseXiAnUpdatePage.getSubsidiaryInput()).to.eq('subsidiary');
        expect(await diseaseXiAnUpdatePage.getNameInput()).to.eq('name');
        expect(await diseaseXiAnUpdatePage.getProjectCodeInput()).to.eq('projectCode');
        expect(await diseaseXiAnUpdatePage.getChargeCodeInput()).to.eq('chargeCode');
        expect(await diseaseXiAnUpdatePage.getTollStandardInput()).to.eq('tollStandard');
        expect(await diseaseXiAnUpdatePage.getSupplementInput()).to.eq('supplement');
        expect(await diseaseXiAnUpdatePage.getSampleInput()).to.eq('sample');
        expect(await diseaseXiAnUpdatePage.getTutorialInput()).to.eq('tutorial');
        expect(await diseaseXiAnUpdatePage.getPreservationInput()).to.eq('preservation');
        expect(await diseaseXiAnUpdatePage.getTransportationInput()).to.eq('transportation');
        expect(await diseaseXiAnUpdatePage.getApplicationUnitTypeInput()).to.eq('applicationUnitType');
        expect(await diseaseXiAnUpdatePage.getApplicationRemarkInput()).to.eq('applicationRemark');
        expect(await diseaseXiAnUpdatePage.getMedicalMethodInput()).to.eq('medicalMethod');
        expect(await diseaseXiAnUpdatePage.getProjectConcourseInput()).to.eq('projectConcourse');
        expect(await diseaseXiAnUpdatePage.getHurryDepartmentInput()).to.eq('hurryDepartment');
        expect(await diseaseXiAnUpdatePage.getReportingTimeInput()).to.eq('reportingTime');
        expect(await diseaseXiAnUpdatePage.getClinicalApplicationInput()).to.eq('clinicalApplication');
        expect(await diseaseXiAnUpdatePage.getSeriesInput()).to.eq('series');
        expect(await diseaseXiAnUpdatePage.getSubSeriesInput()).to.eq('subSeries');
        expect(await diseaseXiAnUpdatePage.getRemarksInput()).to.eq('remarks');
        await diseaseXiAnUpdatePage.save();
        expect(await diseaseXiAnUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await diseaseXiAnComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DiseaseXiAn', async () => {
        const nbButtonsBeforeDelete = await diseaseXiAnComponentsPage.countDeleteButtons();
        await diseaseXiAnComponentsPage.clickOnLastDeleteButton();

        diseaseXiAnDeleteDialog = new DiseaseXiAnDeleteDialog();
        expect(await diseaseXiAnDeleteDialog.getDialogTitle()).to.eq(
            'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.delete.question'
        );
        await diseaseXiAnDeleteDialog.clickOnConfirmButton();

        expect(await diseaseXiAnComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
