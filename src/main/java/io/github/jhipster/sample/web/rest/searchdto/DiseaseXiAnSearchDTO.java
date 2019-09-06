package io.github.jhipster.sample.web.rest.searchdto;

import io.github.jhipster.sample.domain.Concourse;

/**
 * DiseaseXiAnSearchDTO
 */
public class DiseaseXiAnSearchDTO {

    private Long subsidiaryId;

    private Concourse concourse;

    private String projectConcourse;

    private String query;



    public String getProjectConcourse() {
        return projectConcourse;
    }

    public void setProjectConcourse(String projectConcourse) {
        this.projectConcourse = projectConcourse;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }


    @Override
    public String toString() {
        return "DiseaseXiAnSearchDTO [projectConcourse=" + projectConcourse + ", query=" + query + ", subsidiary="
                + subsidiaryId + "]";
    }

    public Concourse getConcourse() {
        return concourse;
    }

    public void setConcourse(Concourse concourse) {
        this.concourse = concourse;
    }

    public Long getSubsidiaryId() {
        return subsidiaryId;
    }

    public void setSubsidiaryId(Long subsidiaryId) {
        this.subsidiaryId = subsidiaryId;
    }

}
