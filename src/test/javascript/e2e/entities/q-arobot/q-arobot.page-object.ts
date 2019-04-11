import { element, by, ElementFinder } from 'protractor';

export class QArobotComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-q-arobot div table .btn-danger'));
    title = element.all(by.css('jhi-q-arobot div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QArobotUpdatePage {
    pageTitle = element(by.id('jhi-q-arobot-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    diseaseSeriesInput = element(by.id('field_diseaseSeries'));
    projectSeriesInput = element(by.id('field_projectSeries'));
    levelInput = element(by.id('field_level'));
    questionTypeInput = element(by.id('field_questionType'));
    questionInput = element(by.id('field_question'));
    answerInput = element(by.id('field_answer'));
    updateDateInput = element(by.id('field_updateDate'));
    submitterInput = element(by.id('field_submitter'));
    qaSubsidiaryInput = element(by.id('field_qaSubsidiary'));
    specialProcessInput = element(by.id('field_specialProcess'));
    qaClassInput = element(by.id('field_qaClass'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDiseaseSeriesInput(diseaseSeries) {
        await this.diseaseSeriesInput.sendKeys(diseaseSeries);
    }

    async getDiseaseSeriesInput() {
        return this.diseaseSeriesInput.getAttribute('value');
    }

    async setProjectSeriesInput(projectSeries) {
        await this.projectSeriesInput.sendKeys(projectSeries);
    }

    async getProjectSeriesInput() {
        return this.projectSeriesInput.getAttribute('value');
    }

    async setLevelInput(level) {
        await this.levelInput.sendKeys(level);
    }

    async getLevelInput() {
        return this.levelInput.getAttribute('value');
    }

    async setQuestionTypeInput(questionType) {
        await this.questionTypeInput.sendKeys(questionType);
    }

    async getQuestionTypeInput() {
        return this.questionTypeInput.getAttribute('value');
    }

    async setQuestionInput(question) {
        await this.questionInput.sendKeys(question);
    }

    async getQuestionInput() {
        return this.questionInput.getAttribute('value');
    }

    async setAnswerInput(answer) {
        await this.answerInput.sendKeys(answer);
    }

    async getAnswerInput() {
        return this.answerInput.getAttribute('value');
    }

    async setUpdateDateInput(updateDate) {
        await this.updateDateInput.sendKeys(updateDate);
    }

    async getUpdateDateInput() {
        return this.updateDateInput.getAttribute('value');
    }

    async setSubmitterInput(submitter) {
        await this.submitterInput.sendKeys(submitter);
    }

    async getSubmitterInput() {
        return this.submitterInput.getAttribute('value');
    }

    async setQaSubsidiaryInput(qaSubsidiary) {
        await this.qaSubsidiaryInput.sendKeys(qaSubsidiary);
    }

    async getQaSubsidiaryInput() {
        return this.qaSubsidiaryInput.getAttribute('value');
    }

    async setSpecialProcessInput(specialProcess) {
        await this.specialProcessInput.sendKeys(specialProcess);
    }

    async getSpecialProcessInput() {
        return this.specialProcessInput.getAttribute('value');
    }

    async setQaClassInput(qaClass) {
        await this.qaClassInput.sendKeys(qaClass);
    }

    async getQaClassInput() {
        return this.qaClassInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class QArobotDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-qArobot-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-qArobot'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
