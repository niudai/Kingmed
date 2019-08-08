package io.github.jhipster.sample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A QArobot.
 */
@Entity
@Table(name = "q_arobot")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "qarobot")
public class QArobot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(name = "disease_xi_an_q_arobot"
        , joinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"))
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "disease_map_q_arobot"
    , joinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id")
    , inverseJoinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id"))
    private Set<QArobot> diseaseMaps = new HashSet<>();



    public Set<DiseaseXiAn> getDiseaseXiAns() {
        return this.diseaseXiAns;
    }

    public void setDiseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
    }

    @Size(max = 30)
    @Column(name = "disease_series", length = 30)
    private String diseaseSeries;

    @Size(max = 40)
    @Column(name = "project_series", length = 40)
    private String projectSeries;

    @Size(max = 30)
    @Column(name = "jhi_level", length = 30)
    private String level;

    @Size(max = 20)
    @Column(name = "question_type", length = 20)
    private String questionType;

    @Size(max = 400)
    @Column(name = "question", length = 400)
    private String question;

    @Size(max = 1500)
    @Column(name = "answer", length = 1500)
    private String answer;

    @Size(max = 40)
    @Column(name = "update_date", length = 40)
    private String updateDate;

    @Size(max = 12)
    @Column(name = "submitter", length = 12)
    private String submitter;

    @Size(max = 20)
    @Column(name = "qa_subsidiary", length = 20)
    private String qaSubsidiary;

    @Size(max = 20)
    @Column(name = "special_process", length = 20)
    private String specialProcess;

    @Size(max = 20)
    @Column(name = "qa_class", length = 20)
    private String qaClass;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiseaseSeries() {
        return diseaseSeries;
    }

    public QArobot diseaseSeries(String diseaseSeries) {
        this.diseaseSeries = diseaseSeries;
        return this;
    }

    public void setDiseaseSeries(String diseaseSeries) {
        this.diseaseSeries = diseaseSeries;
    }

    public String getProjectSeries() {
        return projectSeries;
    }

    public QArobot projectSeries(String projectSeries) {
        this.projectSeries = projectSeries;
        return this;
    }

    public void setProjectSeries(String projectSeries) {
        this.projectSeries = projectSeries;
    }

    public String getLevel() {
        return level;
    }

    public QArobot level(String level) {
        this.level = level;
        return this;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getQuestionType() {
        return questionType;
    }

    public QArobot questionType(String questionType) {
        this.questionType = questionType;
        return this;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getQuestion() {
        return question;
    }

    public QArobot question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public QArobot answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public QArobot updateDate(String updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public String getSubmitter() {
        return submitter;
    }

    public QArobot submitter(String submitter) {
        this.submitter = submitter;
        return this;
    }

    public void setSubmitter(String submitter) {
        this.submitter = submitter;
    }

    public String getQaSubsidiary() {
        return qaSubsidiary;
    }

    public QArobot qaSubsidiary(String qaSubsidiary) {
        this.qaSubsidiary = qaSubsidiary;
        return this;
    }

    public void setQaSubsidiary(String qaSubsidiary) {
        this.qaSubsidiary = qaSubsidiary;
    }

    public String getSpecialProcess() {
        return specialProcess;
    }

    public QArobot specialProcess(String specialProcess) {
        this.specialProcess = specialProcess;
        return this;
    }

    public void setSpecialProcess(String specialProcess) {
        this.specialProcess = specialProcess;
    }

    public String getQaClass() {
        return qaClass;
    }

    public QArobot qaClass(String qaClass) {
        this.qaClass = qaClass;
        return this;
    }

    public void setQaClass(String qaClass) {
        this.qaClass = qaClass;
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
        QArobot qArobot = (QArobot) o;
        if (qArobot.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qArobot.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QArobot{" +
            "id=" + getId() +
            ", diseaseSeries='" + getDiseaseSeries() + "'" +
            ", projectSeries='" + getProjectSeries() + "'" +
            ", level='" + getLevel() + "'" +
            ", questionType='" + getQuestionType() + "'" +
            ", question='" + getQuestion() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            ", submitter='" + getSubmitter() + "'" +
            ", qaSubsidiary='" + getQaSubsidiary() + "'" +
            ", specialProcess='" + getSpecialProcess() + "'" +
            ", qaClass='" + getQaClass() + "'" +
            "}";
    }

    public Set<QArobot> getDiseaseMaps() {
        return diseaseMaps;
    }

    public void setDiseaseMaps(Set<QArobot> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
    }

    public QArobot update(QArobot qa) {
        this.id = qa.id;
        this.diseaseSeries = qa.diseaseSeries;
        this.projectSeries = qa.projectSeries;
        this.level = qa.level;
        this.questionType = qa.questionType;
        this.question = qa.question;
        this.answer = qa.answer;
        this.updateDate = qa.updateDate;
        this.submitter = qa.submitter;
        this.qaSubsidiary = qa.qaSubsidiary;
        this.specialProcess = qa.specialProcess;
        this.qaClass = qa.qaClass;
        return this;
    }
}
