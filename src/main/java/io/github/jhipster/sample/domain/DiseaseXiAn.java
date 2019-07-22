package io.github.jhipster.sample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * A DiseaseXiAn.
 */
@Entity
@Table(name = "disease_xi_an")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "diseasexian")
public class DiseaseXiAn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL
        , orphanRemoval = true,
        fetch = FetchType.EAGER)
    @JoinColumn(name = "disease_xi_an_id")
    private List<PriceXiAn> prices = new ArrayList<PriceXiAn>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "disease_xi_an_q_arobot"
        , joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id"))
    private Set<QArobot> qarobots = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "disease_xi_an_disease_xi_an"
        , joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "related_disease_xi_an_id", referencedColumnName = "id"))
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();

    @ManyToMany(mappedBy = "qarobots"
        , fetch = FetchType.LAZY
        , cascade = CascadeType.PERSIST)
    private Set<DiseaseXiAn> reversedDiseaseXiAns = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "disease_xi_an_image_application"
        , joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "image_application_id", referencedColumnName = "id"))
    private Set<ImageApplication> applications = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "disease_xi_an_image_supplies"
        , joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "image_supplies_id", referencedColumnName = "id"))
    private Set<ImageSupplies> suppliess = new HashSet<>();

    public Set<ImageSupplies> getSuppliess() {
        return this.suppliess;
    }

    public void setSuppliess(Set<ImageSupplies> suppliess) {
        this.suppliess = suppliess;
    }


    public Set<ImageApplication> getApplications() {
        return this.applications;
    }

    public void setApplications(Set<ImageApplication> applications) {
        this.applications = applications;
    }

    public Set<QArobot> getQarobots() {
        return this.qarobots;
    }

    public void setQarobots(Set<QArobot> qarobots) {
        this.qarobots = qarobots;
    }

    @Size(max = 50)
    @Column(name = "subsidiary", length = 50)
    private String subsidiary;

    @Size(max = 300)
    @Column(name = "name", length = 300)
    private String name;

    @NotNull
    @Column(nullable = false)
    private boolean activated = true;

    @Size(max = 500)
    @Column(name = "project_code", length = 50)
    private String projectCode;

    @Size(max = 1000)
    @Column(name = "charge_code", length = 60)
    private String chargeCode;

    @Size(max = 500)
    @Column(name = "toll_standard", length = 500)
    private String tollStandard;

    @Size(max = 600)
    @Column(name = "supplement", length = 600)
    private String supplement;

    @Size(max = 600)
    @Column(name = "jhi_sample", length = 600)
    private String sample;

    @Size(max = 2000)
    @Column(name = "tutorial", length = 500)
    private String tutorial;

    @Size(max = 500)
    @Column(name = "preservation", length = 200)
    private String preservation;

    @Size(max = 600)
    @Column(name = "transportation", length = 600)
    private String transportation;

    @Size(max = 100)
    @Column(name = "application_unit_type", length = 100)
    private String applicationUnitType;

    @Size(max = 500)
    @Column(name = "application_remark", length = 500)
    private String applicationRemark;

    @Size(max = 100)
    @Column(name = "medical_method", length = 100)
    private String medicalMethod;

    @Size(max = 100)
    @Column(name = "project_concourse", length = 100)
    private String projectConcourse;

    @Size(max = 100)
    @Column(name = "hurry_department", length = 100)
    private String hurryDepartment;

    @Size(max = 200)
    @Column(name = "reporting_time", length = 200)
    private String reportingTime;

    @Size(max = 3000)
    @Column(name = "clinical_application", length = 1500)
    private String clinicalApplication;

    @Size(max = 60)
    @Column(name = "series", length = 60)
    private String series;

    @Size(max = 60)
    @Column(name = "sub_series", length = 60)
    private String subSeries;

    @Size(max = 3000)
    @Column(name = "remarks", length = 2000)
    private String remarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubsidiary() {
        return subsidiary;
    }

    public DiseaseXiAn subsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
        return this;
    }

    public void setSubsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
    }

    public String getName() {
        return name;
    }

    public DiseaseXiAn name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public DiseaseXiAn projectCode(String projectCode) {
        this.projectCode = projectCode;
        return this;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getChargeCode() {
        return chargeCode;
    }

    public DiseaseXiAn chargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
        return this;
    }

    public void setChargeCode(String chargeCode) {
        this.chargeCode = chargeCode;
    }

    public String getTollStandard() {
        return tollStandard;
    }

    public List<PriceXiAn> getPrices() {
        return this.prices;
    }

    public void setPrices(List<PriceXiAn> prices) {
        this.prices = prices;
    }

    public DiseaseXiAn prices(List<PriceXiAn> prices) {
        this.prices = prices;
        return this;
    }

    public DiseaseXiAn tollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
        return this;
    }

    public void setTollStandard(String tollStandard) {
        this.tollStandard = tollStandard;
    }

    public String getSupplement() {
        return supplement;
    }

    public DiseaseXiAn supplement(String supplement) {
        this.supplement = supplement;
        return this;
    }

    public void setSupplement(String supplement) {
        this.supplement = supplement;
    }

    public String getSample() {
        return sample;
    }

    public DiseaseXiAn sample(String sample) {
        this.sample = sample;
        return this;
    }

    public void setSample(String sample) {
        this.sample = sample;
    }

    public String getTutorial() {
        return tutorial;
    }

    public DiseaseXiAn tutorial(String tutorial) {
        this.tutorial = tutorial;
        return this;
    }

    public void setTutorial(String tutorial) {
        this.tutorial = tutorial;
    }

    public String getPreservation() {
        return preservation;
    }

    public DiseaseXiAn preservation(String preservation) {
        this.preservation = preservation;
        return this;
    }

    public void setPreservation(String preservation) {
        this.preservation = preservation;
    }

    public String getTransportation() {
        return transportation;
    }

    public DiseaseXiAn transportation(String transportation) {
        this.transportation = transportation;
        return this;
    }

    public void setTransportation(String transportation) {
        this.transportation = transportation;
    }

    public String getApplicationUnitType() {
        return applicationUnitType;
    }

    public DiseaseXiAn applicationUnitType(String applicationUnitType) {
        this.applicationUnitType = applicationUnitType;
        return this;
    }

    public void setApplicationUnitType(String applicationUnitType) {
        this.applicationUnitType = applicationUnitType;
    }

    public String getApplicationRemark() {
        return applicationRemark;
    }

    public DiseaseXiAn applicationRemark(String applicationRemark) {
        this.applicationRemark = applicationRemark;
        return this;
    }

    public void setApplicationRemark(String applicationRemark) {
        this.applicationRemark = applicationRemark;
    }

    public String getMedicalMethod() {
        return medicalMethod;
    }

    public DiseaseXiAn medicalMethod(String medicalMethod) {
        this.medicalMethod = medicalMethod;
        return this;
    }

    public void setMedicalMethod(String medicalMethod) {
        this.medicalMethod = medicalMethod;
    }

    public String getProjectConcourse() {
        return projectConcourse;
    }

    public DiseaseXiAn projectConcourse(String projectConcourse) {
        this.projectConcourse = projectConcourse;
        return this;
    }

    public void setProjectConcourse(String projectConcourse) {
        this.projectConcourse = projectConcourse;
    }

    public String getHurryDepartment() {
        return hurryDepartment;
    }

    public DiseaseXiAn hurryDepartment(String hurryDepartment) {
        this.hurryDepartment = hurryDepartment;
        return this;
    }

    public void setHurryDepartment(String hurryDepartment) {
        this.hurryDepartment = hurryDepartment;
    }

    public String getReportingTime() {
        return reportingTime;
    }

    public DiseaseXiAn reportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
        return this;
    }

    public void setReportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
    }

    public String getClinicalApplication() {
        return clinicalApplication;
    }

    public DiseaseXiAn clinicalApplication(String clinicalApplication) {
        this.clinicalApplication = clinicalApplication;
        return this;
    }

    public void setClinicalApplication(String clinicalApplication) {
        this.clinicalApplication = clinicalApplication;
    }

    public String getSeries() {
        return series;
    }

    public DiseaseXiAn series(String series) {
        this.series = series;
        return this;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getSubSeries() {
        return subSeries;
    }

    public DiseaseXiAn subSeries(String subSeries) {
        this.subSeries = subSeries;
        return this;
    }

    public void setSubSeries(String subSeries) {
        this.subSeries = subSeries;
    }

    public String getRemarks() {
        return remarks;
    }

    public DiseaseXiAn remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
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
        DiseaseXiAn diseaseXiAn = (DiseaseXiAn) o;
        if (diseaseXiAn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diseaseXiAn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiseaseXiAn{" +
            "id=" + getId() +
            ", subsidiary='" + getSubsidiary() + "'" +
            // ", prices='" + getPrices() + "'" +
            ", name='" + getName() + "'" +
            ", projectCode='" + getProjectCode() + "'" +
            ", chargeCode='" + getChargeCode() + "'" +
            ", tollStandard='" + getTollStandard() + "'" +
            ", supplement='" + getSupplement() + "'" +
            ", sample='" + getSample() + "'" +
            ", tutorial='" + getTutorial() + "'" +
            ", preservation='" + getPreservation() + "'" +
            ", transportation='" + getTransportation() + "'" +
            ", applicationUnitType='" + getApplicationUnitType() + "'" +
            ", applicationRemark='" + getApplicationRemark() + "'" +
            ", medicalMethod='" + getMedicalMethod() + "'" +
            ", projectConcourse='" + getProjectConcourse() + "'" +
            ", hurryDepartment='" + getHurryDepartment() + "'" +
            ", reportingTime='" + getReportingTime() + "'" +
            ", clinicalApplication='" + getClinicalApplication() + "'" +
            ", series='" + getSeries() + "'" +
            ", subSeries='" + getSubSeries() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public Set<DiseaseXiAn> getDiseaseXiAns() {
        return diseaseXiAns;
    }

    public void setDiseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
    }

    public Set<DiseaseXiAn> getReversedDiseaseXiAns() {
        return reversedDiseaseXiAns;
    }

    public void setReversedDiseaseXiAns(Set<DiseaseXiAn> reversedDiseaseXiAns) {
        this.reversedDiseaseXiAns = reversedDiseaseXiAns;
    }
}
