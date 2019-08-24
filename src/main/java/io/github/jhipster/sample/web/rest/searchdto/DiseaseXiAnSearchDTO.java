package io.github.jhipster.sample.web.rest.searchdto;


/**
 * DiseaseXiAnSearchDTO
 */
public class DiseaseXiAnSearchDTO {

    private String subsidiary;

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
    
}