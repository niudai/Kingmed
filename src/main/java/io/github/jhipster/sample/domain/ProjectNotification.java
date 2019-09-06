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
import javax.validation.constraints.Size;

import io.github.jhipster.sample.service.dto.ProjectNotificatonDTO;

@Entity
@Table(name = "project_notification")
public class ProjectNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Size(max = 80)
    private String title;

    @ManyToOne
    @JoinColumn(name = "subsidiary_id")
    private Subsidiary subsidiary;

    private String description; // name of notification

    @Column(name = "created_date")
    private Instant createdDate = Instant.now(); // notification date

    @ManyToOne
    @JoinColumn(name = "disease_xi_an_id")
    private DiseaseXiAn diseaseXiAn;

    public ProjectNotification(DiseaseXiAn diseaseXiAn, ProjectNotificatonDTO dto) {
        if (diseaseXiAn != null) {
            this.diseaseXiAn = diseaseXiAn;

        }
        this.description = dto.getDescription();
        this.type = dto.getType();
        this.title = dto.getTitle();
        this.subsidiary = dto.getSubsidiary();
        this.createdDate = Instant.now();
    }

    public ProjectNotification() {

    }

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
