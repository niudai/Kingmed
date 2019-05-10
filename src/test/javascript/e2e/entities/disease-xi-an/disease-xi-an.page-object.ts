import { element, by, ElementFinder } from 'protractor';

export class DiseaseXiAnComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-disease-xi-an div table .btn-danger'));
    title = element.all(by.css('jhi-disease-xi-an div h2#page-heading span')).first();

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

export class DiseaseXiAnUpdatePage {
    pageTitle = element(by.id('jhi-disease-xi-an-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    subsidiaryInput = element(by.id('field_subsidiary'));
    nameInput = element(by.id('field_name'));
    projectCodeInput = element(by.id('field_projectCode'));
    chargeCodeInput = element(by.id('field_chargeCode'));
    tollStandardInput = element(by.id('field_tollStandard'));
    supplementInput = element(by.id('field_supplement'));
    sampleInput = element(by.id('field_sample'));
    tutorialInput = element(by.id('field_tutorial'));
    preservationInput = element(by.id('field_preservation'));
    transportationInput = element(by.id('field_transportation'));
    applicationUnitTypeInput = element(by.id('field_applicationUnitType'));
    applicationRemarkInput = element(by.id('field_applicationRemark'));
    medicalMethodInput = element(by.id('field_medicalMethod'));
    projectConcourseInput = element(by.id('field_projectConcourse'));
    hurryDepartmentInput = element(by.id('field_hurryDepartment'));
    reportingTimeInput = element(by.id('field_reportingTime'));
    clinicalApplicationInput = element(by.id('field_clinicalApplication'));
    seriesInput = element(by.id('field_series'));
    subSeriesInput = element(by.id('field_subSeries'));
    remarksInput = element(by.id('field_remarks'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSubsidiaryInput(subsidiary) {
        await this.subsidiaryInput.sendKeys(subsidiary);
    }

    async getSubsidiaryInput() {
        return this.subsidiaryInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setProjectCodeInput(projectCode) {
        await this.projectCodeInput.sendKeys(projectCode);
    }

    async getProjectCodeInput() {
        return this.projectCodeInput.getAttribute('value');
    }

    async setChargeCodeInput(chargeCode) {
        await this.chargeCodeInput.sendKeys(chargeCode);
    }

    async getChargeCodeInput() {
        return this.chargeCodeInput.getAttribute('value');
    }

    async setTollStandardInput(tollStandard) {
        await this.tollStandardInput.sendKeys(tollStandard);
    }

    async getTollStandardInput() {
        return this.tollStandardInput.getAttribute('value');
    }

    async setSupplementInput(supplement) {
        await this.supplementInput.sendKeys(supplement);
    }

    async getSupplementInput() {
        return this.supplementInput.getAttribute('value');
    }

    async setSampleInput(sample) {
        await this.sampleInput.sendKeys(sample);
    }

    async getSampleInput() {
        return this.sampleInput.getAttribute('value');
    }

    async setTutorialInput(tutorial) {
        await this.tutorialInput.sendKeys(tutorial);
    }

    async getTutorialInput() {
        return this.tutorialInput.getAttribute('value');
    }

    async setPreservationInput(preservation) {
        await this.preservationInput.sendKeys(preservation);
    }

    async getPreservationInput() {
        return this.preservationInput.getAttribute('value');
    }

    async setTransportationInput(transportation) {
        await this.transportationInput.sendKeys(transportation);
    }

    async getTransportationInput() {
        return this.transportationInput.getAttribute('value');
    }

    async setApplicationUnitTypeInput(applicationUnitType) {
        await this.applicationUnitTypeInput.sendKeys(applicationUnitType);
    }

    async getApplicationUnitTypeInput() {
        return this.applicationUnitTypeInput.getAttribute('value');
    }

    async setApplicationRemarkInput(applicationRemark) {
        await this.applicationRemarkInput.sendKeys(applicationRemark);
    }

    async getApplicationRemarkInput() {
        return this.applicationRemarkInput.getAttribute('value');
    }

    async setMedicalMethodInput(medicalMethod) {
        await this.medicalMethodInput.sendKeys(medicalMethod);
    }

    async getMedicalMethodInput() {
        return this.medicalMethodInput.getAttribute('value');
    }

    async setProjectConcourseInput(projectConcourse) {
        await this.projectConcourseInput.sendKeys(projectConcourse);
    }

    async getProjectConcourseInput() {
        return this.projectConcourseInput.getAttribute('value');
    }

    async setHurryDepartmentInput(hurryDepartment) {
        await this.hurryDepartmentInput.sendKeys(hurryDepartment);
    }

    async getHurryDepartmentInput() {
        return this.hurryDepartmentInput.getAttribute('value');
    }

    async setReportingTimeInput(reportingTime) {
        await this.reportingTimeInput.sendKeys(reportingTime);
    }

    async getReportingTimeInput() {
        return this.reportingTimeInput.getAttribute('value');
    }

    async setClinicalApplicationInput(clinicalApplication) {
        await this.clinicalApplicationInput.sendKeys(clinicalApplication);
    }

    async getClinicalApplicationInput() {
        return this.clinicalApplicationInput.getAttribute('value');
    }

    async setSeriesInput(series) {
        await this.seriesInput.sendKeys(series);
    }

    async getSeriesInput() {
        return this.seriesInput.getAttribute('value');
    }

    async setSubSeriesInput(subSeries) {
        await this.subSeriesInput.sendKeys(subSeries);
    }

    async getSubSeriesInput() {
        return this.subSeriesInput.getAttribute('value');
    }

    async setRemarksInput(remarks) {
        await this.remarksInput.sendKeys(remarks);
    }

    async getRemarksInput() {
        return this.remarksInput.getAttribute('value');
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

export class DiseaseXiAnDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-diseaseXiAn-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-diseaseXiAn'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
