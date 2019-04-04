import { element, by, ElementFinder } from 'protractor';

export class DiseaseGuangDongComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-disease-guang-dong div table .btn-danger'));
    title = element.all(by.css('jhi-disease-guang-dong div h2#page-heading span')).first();

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

export class DiseaseGuangDongUpdatePage {
    pageTitle = element(by.id('jhi-disease-guang-dong-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    subsidiaryInput = element(by.id('field_subsidiary'));
    supplementInput = element(by.id('field_supplement'));
    testMethodInput = element(by.id('field_testMethod'));
    sampleInput = element(by.id('field_sample'));
    roomPreservationInput = element(by.id('field_roomPreservation'));
    coldStoragePreservationInput = element(by.id('field_coldStoragePreservation'));
    freezingInput = element(by.id('field_freezing'));
    clinicalApplicationInput = element(by.id('field_clinicalApplication'));
    tollStandardInput = element(by.id('field_tollStandard'));
    reportingTimeInput = element(by.id('field_reportingTime'));
    remarksInput = element(by.id('field_remarks'));
    chargeCodeInput = element(by.id('field_chargeCode'));
    classificationInput = element(by.id('field_classification'));
    applicationUnitTypeInput = element(by.id('field_applicationUnitType'));
    seriesInput = element(by.id('field_series'));
    projectChangeNotificationInput = element(by.id('field_projectChangeNotification'));
    specialInspectionItemsInput = element(by.id('field_specialInspectionItems'));
    stopDevelopingInput = element(by.id('field_stopDeveloping'));
    projectConcourseInput = element(by.id('field_projectConcourse'));
    testDepartmentInput = element(by.id('field_testDepartment'));
    suppliesSeriesInput = element(by.id('field_suppliesSeries'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setSubsidiaryInput(subsidiary) {
        await this.subsidiaryInput.sendKeys(subsidiary);
    }

    async getSubsidiaryInput() {
        return this.subsidiaryInput.getAttribute('value');
    }

    async setSupplementInput(supplement) {
        await this.supplementInput.sendKeys(supplement);
    }

    async getSupplementInput() {
        return this.supplementInput.getAttribute('value');
    }

    async setTestMethodInput(testMethod) {
        await this.testMethodInput.sendKeys(testMethod);
    }

    async getTestMethodInput() {
        return this.testMethodInput.getAttribute('value');
    }

    async setSampleInput(sample) {
        await this.sampleInput.sendKeys(sample);
    }

    async getSampleInput() {
        return this.sampleInput.getAttribute('value');
    }

    async setRoomPreservationInput(roomPreservation) {
        await this.roomPreservationInput.sendKeys(roomPreservation);
    }

    async getRoomPreservationInput() {
        return this.roomPreservationInput.getAttribute('value');
    }

    async setColdStoragePreservationInput(coldStoragePreservation) {
        await this.coldStoragePreservationInput.sendKeys(coldStoragePreservation);
    }

    async getColdStoragePreservationInput() {
        return this.coldStoragePreservationInput.getAttribute('value');
    }

    async setFreezingInput(freezing) {
        await this.freezingInput.sendKeys(freezing);
    }

    async getFreezingInput() {
        return this.freezingInput.getAttribute('value');
    }

    async setClinicalApplicationInput(clinicalApplication) {
        await this.clinicalApplicationInput.sendKeys(clinicalApplication);
    }

    async getClinicalApplicationInput() {
        return this.clinicalApplicationInput.getAttribute('value');
    }

    async setTollStandardInput(tollStandard) {
        await this.tollStandardInput.sendKeys(tollStandard);
    }

    async getTollStandardInput() {
        return this.tollStandardInput.getAttribute('value');
    }

    async setReportingTimeInput(reportingTime) {
        await this.reportingTimeInput.sendKeys(reportingTime);
    }

    async getReportingTimeInput() {
        return this.reportingTimeInput.getAttribute('value');
    }

    async setRemarksInput(remarks) {
        await this.remarksInput.sendKeys(remarks);
    }

    async getRemarksInput() {
        return this.remarksInput.getAttribute('value');
    }

    async setChargeCodeInput(chargeCode) {
        await this.chargeCodeInput.sendKeys(chargeCode);
    }

    async getChargeCodeInput() {
        return this.chargeCodeInput.getAttribute('value');
    }

    async setClassificationInput(classification) {
        await this.classificationInput.sendKeys(classification);
    }

    async getClassificationInput() {
        return this.classificationInput.getAttribute('value');
    }

    async setApplicationUnitTypeInput(applicationUnitType) {
        await this.applicationUnitTypeInput.sendKeys(applicationUnitType);
    }

    async getApplicationUnitTypeInput() {
        return this.applicationUnitTypeInput.getAttribute('value');
    }

    async setSeriesInput(series) {
        await this.seriesInput.sendKeys(series);
    }

    async getSeriesInput() {
        return this.seriesInput.getAttribute('value');
    }

    async setProjectChangeNotificationInput(projectChangeNotification) {
        await this.projectChangeNotificationInput.sendKeys(projectChangeNotification);
    }

    async getProjectChangeNotificationInput() {
        return this.projectChangeNotificationInput.getAttribute('value');
    }

    async setSpecialInspectionItemsInput(specialInspectionItems) {
        await this.specialInspectionItemsInput.sendKeys(specialInspectionItems);
    }

    async getSpecialInspectionItemsInput() {
        return this.specialInspectionItemsInput.getAttribute('value');
    }

    async setStopDevelopingInput(stopDeveloping) {
        await this.stopDevelopingInput.sendKeys(stopDeveloping);
    }

    async getStopDevelopingInput() {
        return this.stopDevelopingInput.getAttribute('value');
    }

    async setProjectConcourseInput(projectConcourse) {
        await this.projectConcourseInput.sendKeys(projectConcourse);
    }

    async getProjectConcourseInput() {
        return this.projectConcourseInput.getAttribute('value');
    }

    async setTestDepartmentInput(testDepartment) {
        await this.testDepartmentInput.sendKeys(testDepartment);
    }

    async getTestDepartmentInput() {
        return this.testDepartmentInput.getAttribute('value');
    }

    async setSuppliesSeriesInput(suppliesSeries) {
        await this.suppliesSeriesInput.sendKeys(suppliesSeries);
    }

    async getSuppliesSeriesInput() {
        return this.suppliesSeriesInput.getAttribute('value');
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

export class DiseaseGuangDongDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-diseaseGuangDong-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-diseaseGuangDong'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
