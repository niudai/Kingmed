package io.github.jhipster.sample.web.rest.searchdto;

/**
 * QarobotSearchDTO
 */
public class DiseaseMapSearchDTO {

    private String name;

    @Override
    public String toString() {
        return "MediaTypeSearch [query=" + name + "]";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
}