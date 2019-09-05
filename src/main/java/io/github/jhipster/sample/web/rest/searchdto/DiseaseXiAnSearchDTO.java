package io.github.jhipster.sample.web.rest.searchdto;

import io.github.jhipster.sample.domain.Concourse;

/**
 * DiseaseXiAnSearchDTO
 */
public class DiseaseXiAnSearchDTO {

    private String subsidiary;

    private Concourse concourse;

    private String projectConcourse;

    private String query;

    public String getSubsidiary() {
        return subsidiary;
    }

    public void setSubsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
    }

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
                + subsidiary + "]";
    }

    public Concourse getConcourse() {
        return concourse;
    }

    public void setConcourse(Concourse concourse) {
        this.concourse = concourse;
    }

}
