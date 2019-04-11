/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QArobotComponentsPage, QArobotDeleteDialog, QArobotUpdatePage } from './q-arobot.page-object';

const expect = chai.expect;

describe('QArobot e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let qArobotUpdatePage: QArobotUpdatePage;
    let qArobotComponentsPage: QArobotComponentsPage;
    let qArobotDeleteDialog: QArobotDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load QArobots', async () => {
        await navBarPage.goToEntity('q-arobot');
        qArobotComponentsPage = new QArobotComponentsPage();
        await browser.wait(ec.visibilityOf(qArobotComponentsPage.title), 5000);
        expect(await qArobotComponentsPage.getTitle()).to.eq('jhipsterElasticsearchSampleApplicationApp.qArobot.home.title');
    });

    it('should load create QArobot page', async () => {
        await qArobotComponentsPage.clickOnCreateButton();
        qArobotUpdatePage = new QArobotUpdatePage();
        expect(await qArobotUpdatePage.getPageTitle()).to.eq('jhipsterElasticsearchSampleApplicationApp.qArobot.home.createOrEditLabel');
        await qArobotUpdatePage.cancel();
    });

    it('should create and save QArobots', async () => {
        const nbButtonsBeforeCreate = await qArobotComponentsPage.countDeleteButtons();

        await qArobotComponentsPage.clickOnCreateButton();
        await promise.all([
            qArobotUpdatePage.setDiseaseSeriesInput('diseaseSeries'),
            qArobotUpdatePage.setProjectSeriesInput('projectSeries'),
            qArobotUpdatePage.setLevelInput('level'),
            qArobotUpdatePage.setQuestionTypeInput('questionType'),
            qArobotUpdatePage.setQuestionInput('question'),
            qArobotUpdatePage.setAnswerInput('answer'),
            qArobotUpdatePage.setUpdateDateInput('updateDate'),
            qArobotUpdatePage.setSubmitterInput('submitter'),
            qArobotUpdatePage.setQaSubsidiaryInput('qaSubsidiary'),
            qArobotUpdatePage.setSpecialProcessInput('specialProcess'),
            qArobotUpdatePage.setQaClassInput('qaClass')
        ]);
        expect(await qArobotUpdatePage.getDiseaseSeriesInput()).to.eq('diseaseSeries');
        expect(await qArobotUpdatePage.getProjectSeriesInput()).to.eq('projectSeries');
        expect(await qArobotUpdatePage.getLevelInput()).to.eq('level');
        expect(await qArobotUpdatePage.getQuestionTypeInput()).to.eq('questionType');
        expect(await qArobotUpdatePage.getQuestionInput()).to.eq('question');
        expect(await qArobotUpdatePage.getAnswerInput()).to.eq('answer');
        expect(await qArobotUpdatePage.getUpdateDateInput()).to.eq('updateDate');
        expect(await qArobotUpdatePage.getSubmitterInput()).to.eq('submitter');
        expect(await qArobotUpdatePage.getQaSubsidiaryInput()).to.eq('qaSubsidiary');
        expect(await qArobotUpdatePage.getSpecialProcessInput()).to.eq('specialProcess');
        expect(await qArobotUpdatePage.getQaClassInput()).to.eq('qaClass');
        await qArobotUpdatePage.save();
        expect(await qArobotUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await qArobotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last QArobot', async () => {
        const nbButtonsBeforeDelete = await qArobotComponentsPage.countDeleteButtons();
        await qArobotComponentsPage.clickOnLastDeleteButton();

        qArobotDeleteDialog = new QArobotDeleteDialog();
        expect(await qArobotDeleteDialog.getDialogTitle()).to.eq('jhipsterElasticsearchSampleApplicationApp.qArobot.delete.question');
        await qArobotDeleteDialog.clickOnConfirmButton();

        expect(await qArobotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
