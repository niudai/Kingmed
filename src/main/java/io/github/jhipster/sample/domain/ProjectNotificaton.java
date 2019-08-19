package io.github.jhipster.sample.domain;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "project_notification")
public class ProjectNotificaton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @ManyToOne
    @JoinColumn(name = "subsidiary_name")
    private Subsidiary subsidiary;

    private String description; // name of notification

    @Column(name = "created_date")
    private Instant createdDate = Instant.now(); // notification date

    @ManyToOne
    @JoinColumn(name = "disease_xi_an_id")
    private DiseaseXiAn diseaseXiAn;

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public Subsidiary getSubsidiary() {
        return subsidiary;
    }

    public void setSubsidiary(Subsidiary subsidiary) {
        this.subsidiary = subsidiary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public DiseaseXiAn getDiseaseXiAn() {
        return diseaseXiAn;
    }

    public void setDiseaseXiAn(DiseaseXiAn diseaseXiAn) {
        this.diseaseXiAn = diseaseXiAn;
    }

}
