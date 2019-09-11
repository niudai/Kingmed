package io.github.jhipster.sample.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DiseaseXiAn.
 */
@Entity
@Table(name = "disease_xi_an")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DiseaseXiAn  extends AbstractViewsEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    /************************************************ One-to-Many Or Many-to-Many Asso */


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "disease_xi_an_id")
    @BatchSize(size = 10)
    private List<PriceXiAn> prices = new ArrayList<PriceXiAn>();


    @JsonIgnore
    @OneToMany(cascade =  CascadeType.REMOVE)
    @JoinColumn(name = "disease_xi_an_id")
    private List<ProjectNotification> ntfs;


    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "disease_xi_an_id")
    private List<Comment> comments = new ArrayList<Comment>();

    @Column(name = "subsidiary_id")
    private Long subsidiaryId;

    @Column(name = "concourse_id")
    private Long concourseId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "disease_xi_an_id")
    @BatchSize(size = 10)
    private Set<LinkCard> linkCards = new HashSet<LinkCard>();


    @ManyToMany
    @JoinTable(name = "disease_xi_an_q_arobot", joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id"))
    private Set<QArobot> qarobots = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "disease_xi_an_disease_xi_an", joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "related_disease_xi_an_id", referencedColumnName = "id"))
    @JsonIgnoreProperties({ "diseaseXiAns", "reversedDiseaseXiAns" })
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "disease_xi_an_disease_xi_an", joinColumns = @JoinColumn(name = "related_disease_xi_an_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"))
    @JsonIgnoreProperties({ "diseaseXiAns", "reversedDiseaseXiAns" })
    private Set<DiseaseXiAn> reversedDiseaseXiAns = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "disease_map_disease_xi_an"
        , joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id"))
    private Set<DiseaseMap> diseaseMaps = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "disease_xi_an_image_application", joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "image_application_id", referencedColumnName = "id"))
    private Set<ImageApplication> applications = new HashSet<>();

    @ManyToMany

    @JoinTable(name = "disease_xi_an_image_supplies", joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "image_supplies_id", referencedColumnName = "id"))
    private Set<ImageSupplies> suppliess = new HashSet<>();


    @ManyToMany
    @JoinTable(
        name = "disease_xi_an_user",
        joinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> users = new HashSet<>();

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



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
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
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        DiseaseXiAn other = (DiseaseXiAn) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiseaseXiAn [activated=" + activated + ", name=" + name + ", preservation=" + preservation + "]";
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

    public Set<DiseaseMap> getDiseaseMaps() {
        return diseaseMaps;
    }

    public void setDiseaseMaps(Set<DiseaseMap> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
    }

    public Set<LinkCard> getLinkCards() {
        return linkCards;
    }

    public void setLinkCards(Set<LinkCard> linkCards) {
        this.linkCards = linkCards;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public DiseaseXiAn update(DiseaseXiAn diseaseXiAn) {
        this.setLastModifiedDate(diseaseXiAn.getLastModifiedDate());
        this.setViews(diseaseXiAn.getViews());
        this.id = diseaseXiAn.id;
        this.subsidiary = diseaseXiAn.subsidiary;
        this.subsidiaryId = diseaseXiAn.subsidiaryId;
        this.concourseId = diseaseXiAn.concourseId;
        this.name = diseaseXiAn.name;
        this.activated = diseaseXiAn.activated;
        this.projectCode = diseaseXiAn.projectCode;
        this.chargeCode = diseaseXiAn.chargeCode;
        this.tollStandard = diseaseXiAn.tollStandard;
        this.supplement = diseaseXiAn.supplement;
        this.sample = diseaseXiAn.sample;
        this.tutorial = diseaseXiAn.tutorial;
        this.preservation = diseaseXiAn.preservation;
        this.transportation = diseaseXiAn.transportation;
        this.applicationRemark = diseaseXiAn.applicationRemark;
        this.applicationUnitType = diseaseXiAn.applicationUnitType;
        this.medicalMethod = diseaseXiAn.medicalMethod;
        this.projectConcourse = diseaseXiAn.projectConcourse;
        this.hurryDepartment = diseaseXiAn.hurryDepartment;
        this.reportingTime = diseaseXiAn.reportingTime;
        this.clinicalApplication = diseaseXiAn.clinicalApplication;
        this.series = diseaseXiAn.series;
        this.subSeries = diseaseXiAn.subSeries;
        this.remarks = diseaseXiAn.remarks;
        return this;
    }




    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Long getSubsidiaryId() {
        return subsidiaryId;
    }

    public void setSubsidiaryId(Long subsidiaryId) {
        this.subsidiaryId = subsidiaryId;
    }

    public Long getConcourseId() {
        return concourseId;
    }

    public void setConcourseId(Long concourseId) {
        this.concourseId = concourseId;
    }
}
