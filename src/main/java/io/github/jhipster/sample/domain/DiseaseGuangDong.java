package io.github.jhipster.sample.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DiseaseGuangDong.
 */
@Entity
@Table(name = "disease_guang_dong")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "diseaseguangdong")
public class DiseaseGuangDong implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 300)
    @Column(name = "name", length = 300)
    private String name;

    @Size(max = 50)
    @Column(name = "subsidiary", length = 50)
    private String subsidiary;

    @Size(max = 1000)
    @Column(name = "supplement", length = 1000)
    private String supplement;

    @Size(max = 200)
    @Column(name = "test_method", length = 200)
    private String testMethod;

    @Size(max = 600)
    @Column(name = "jhi_sample", length = 600)
    private String sample;

    @Size(max = 200)
    @Column(name = "room_preservation", length = 200)
    private String roomPreservation;

    @Size(max = 200)
    @Column(name = "cold_storage_preservation", length = 200)
    private String coldStoragePreservation;

    @Size(max = 100)
    @Column(name = "freezing", length = 100)
    private String freezing;

    @Size(max = 1000)
    @Column(name = "clinical_application", length = 1000)
    private String clinicalApplication;

    @Size(max = 500)
    @Column(name = "toll_standard", length = 500)
    private String tollStandard;

    @Size(max = 500)
    @Column(name = "reporting_time", length = 500)
    private String reportingTime;

    @Size(max = 2000)
    @Column(name = "remarks", length = 2000)
    private String remarks;

    @Size(max = 500)
    @Column(name = "charge_code", length = 500)
    private String chargeCode;

    @Size(max = 100)
    @Column(name = "classification", length = 100)
    private String classification;

    @Size(max = 100)
    @Column(name = "application_unit_type", length = 100)
    private String applicationUnitType;

    @Size(max = 100)
    @Column(name = "series", length = 100)
    private String series;

    @Size(max = 500)
    @Column(name = "project_change_notification", length = 500)
    private String projectChangeNotification;

    @Size(max = 50)
    @Column(name = "special_inspection_items", length = 50)
    private String specialInspectionItems;

    @Size(max = 50)
    @Column(name = "stop_developing", length = 50)
    private String stopDeveloping;

    @Size(max = 100)
    @Column(name = "project_concourse", length = 100)
    private String projectConcourse;

    @Size(max = 100)
    @Column(name = "test_department", length = 100)
    private String testDepartment;

    @Size(max = 100)
    @Column(name = "supplies_series", length = 100)
    private String suppliesSeries;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DiseaseGuangDong name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubsidiary() {
        return subsidiary;
    }

    public DiseaseGuangDong subsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
        return this;
    }

    public void setSubsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
    }

    public String getSupplement() {
        return supplement;
    }

    public DiseaseGuangDong supplement(String supplement) {
        this.supplement = supplement;
        return this;
    }

    public void setSupplement(String supplement) {
        this.supplement = supplement;
    }

    public String getTestMethod() {
        return testMethod;
    }

    public DiseaseGuangDong testMethod(String testMethod) {
        this.testMethod = testMethod;
        return this;
    }

    public void setTestMethod(String testMethod) {
        this.testMethod = testMethod;
    }

    public String getSample() {
        return sample;
    }

    public DiseaseGuangDong sample(String sample) {
        this.sample = sample;
        return this;
    }

    public void setSample(String sample) {
        this.sample = sample;
    }

    public String getRoomPreservation() {
        return roomPreservation;
    }

    public DiseaseGuangDong roomPreservation(String roomPreservation) {
        this.roomPreservation = roomPreservation;
        return this;
    }

    public void setRoomPreservation(String roomPreservation) {
        this.roomPreservation = roomPreservation;
    }

    public String getColdStoragePreservation() {
        return coldStoragePreservation;
    }

    public DiseaseGuangDong coldStoragePreservation(String coldStoragePreservation) {
        this.coldStoragePreservation = coldStoragePreservation;
        return this;
    }

    public void setColdStoragePreservation(String coldStoragePreservation) {
        this.coldStoragePreservation = coldStoragePreservation;
    }

    public String getFreezing() {
        return freezing;
    }

    public DiseaseGuangDong freezing(String freezing) {
        this.freezing = freezing;
        return this;
    }

    public void setFreezing(String freezing) {
        this.freezing = freezing;
    }

    public String getClinicalApplication() {
        return clinicalApplication;
    }

    public DiseaseGuangDong clinicalApplication(String clinicalApplication) {
        this.clinicalApplication = clinicalApplication;
        return this;
    }

    public void setClinicalApplication(String clinicalApplication) {
        this.clinicalApplication = clinicalApplication;
    }

    public String getTollStandard() {
        return tollStandard;
    }

    public DiseaseGuangDong tollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
        return this;
    }

    public void setTollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
    }

    public String getReportingTime() {
        return reportingTime;
    }

    public DiseaseGuangDong reportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
        return this;
    }

    public void setReportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
    }

    public String getRemarks() {
        return remarks;
    }

    public DiseaseGuangDong remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getChargeCode() {
        return chargeCode;
    }

    public DiseaseGuangDong chargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
        return this;
    }

    public void setChargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
    }

    public String getClassification() {
        return classification;
    }

    public DiseaseGuangDong classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getApplicationUnitType() {
        return applicationUnitType;
    }

    public DiseaseGuangDong applicationUnitType(String applicationUnitType) {
        this.applicationUnitType = applicationUnitType;
        return this;
    }

    public void setApplicationUnitType(String applicationUnitType) {
        this.applicationUnitType = applicationUnitType;
    }

    public String getSeries() {
        return series;
    }

    public DiseaseGuangDong series(String series) {
        this.series = series;
        return this;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getProjectChangeNotification() {
        return projectChangeNotification;
    }

    public DiseaseGuangDong projectChangeNotification(String projectChangeNotification) {
        this.projectChangeNotification = projectChangeNotification;
        return this;
    }

    public void setProjectChangeNotification(String projectChangeNotification) {
        this.projectChangeNotification = projectChangeNotification;
    }

    public String getSpecialInspectionItems() {
        return specialInspectionItems;
    }

    public DiseaseGuangDong specialInspectionItems(String specialInspectionItems) {
        this.specialInspectionItems = specialInspectionItems;
        return this;
    }

    public void setSpecialInspectionItems(String specialInspectionItems) {
        this.specialInspectionItems = specialInspectionItems;
    }

    public String getStopDeveloping() {
        return stopDeveloping;
    }

    public DiseaseGuangDong stopDeveloping(String stopDeveloping) {
        this.stopDeveloping = stopDeveloping;
        return this;
    }

    public void setStopDeveloping(String stopDeveloping) {
        this.stopDeveloping = stopDeveloping;
    }

    public String getProjectConcourse() {
        return projectConcourse;
    }

    public DiseaseGuangDong projectConcourse(String projectConcourse) {
        this.projectConcourse = projectConcourse;
        return this;
    }

    public void setProjectConcourse(String projectConcourse) {
        this.projectConcourse = projectConcourse;
    }

    public String getTestDepartment() {
        return testDepartment;
    }

    public DiseaseGuangDong testDepartment(String testDepartment) {
        this.testDepartment = testDepartment;
        return this;
    }

    public void setTestDepartment(String testDepartment) {
        this.testDepartment = testDepartment;
    }

    public String getSuppliesSeries() {
        return suppliesSeries;
    }

    public DiseaseGuangDong suppliesSeries(String suppliesSeries) {
        this.suppliesSeries = suppliesSeries;
        return this;
    }

    public void setSuppliesSeries(String suppliesSeries) {
        this.suppliesSeries = suppliesSeries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DiseaseGuangDong diseaseGuangDong = (DiseaseGuangDong) o;
        if (diseaseGuangDong.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diseaseGuangDong.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiseaseGuangDong{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", subsidiary='" + getSubsidiary() + "'" +
            ", supplement='" + getSupplement() + "'" +
            ", testMethod='" + getTestMethod() + "'" +
            ", sample='" + getSample() + "'" +
            ", roomPreservation='" + getRoomPreservation() + "'" +
            ", coldStoragePreservation='" + getColdStoragePreservation() + "'" +
            ", freezing='" + getFreezing() + "'" +
            ", clinicalApplication='" + getClinicalApplication() + "'" +
            ", tollStandard='" + getTollStandard() + "'" +
            ", reportingTime='" + getReportingTime() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", chargeCode='" + getChargeCode() + "'" +
            ", classification='" + getClassification() + "'" +
            ", applicationUnitType='" + getApplicationUnitType() + "'" +
            ", series='" + getSeries() + "'" +
            ", projectChangeNotification='" + getProjectChangeNotification() + "'" +
            ", specialInspectionItems='" + getSpecialInspectionItems() + "'" +
            ", stopDeveloping='" + getStopDeveloping() + "'" +
            ", projectConcourse='" + getProjectConcourse() + "'" +
            ", testDepartment='" + getTestDepartment() + "'" +
            ", suppliesSeries='" + getSuppliesSeries() + "'" +
            "}";
    }
}
