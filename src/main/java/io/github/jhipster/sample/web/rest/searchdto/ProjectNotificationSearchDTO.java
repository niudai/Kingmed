package io.github.jhipster.sample.web.rest.searchdto;

import java.time.Instant;

import io.github.jhipster.sample.domain.NotificationType;

/**
 * DiseaseXiAnSearchDTO
 */
public class ProjectNotificationSearchDTO {

    private Long subsidiaryId;

    private Instant lowerBound;

    private Instant upperBound;

    private NotificationType type;

    public Long getSubsidiaryId() {
        return subsidiaryId;
    }

    public void setSubsidiaryId(Long subsidiaryId) {
        this.subsidiaryId = subsidiaryId;
    }

    public Instant getLowerBound() {
        return lowerBound;
    }

    public void setLowerBound(Instant lowerBound) {
        this.lowerBound = lowerBound;
    }

    public Instant getUpperBound() {
        return upperBound;
    }

    public void setUpperBound(Instant upperBound) {
        this.upperBound = upperBound;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

}
