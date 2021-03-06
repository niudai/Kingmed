package io.github.jhipster.sample.service.dto;

import io.github.jhipster.sample.domain.NotificationType;
import io.github.jhipster.sample.domain.Subsidiary;

public class ProjectNotificatonDTO {

    private NotificationType type;

    private String title;

    private Subsidiary subsidiary;

    private String description; // name of notification


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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "ProjectNotificatonDTO [description=" + description + ", subsidiary=" + subsidiary + ", title=" + title
                + ", type=" + type + "]";
    }

}
