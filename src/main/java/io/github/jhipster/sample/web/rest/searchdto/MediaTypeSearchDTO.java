package io.github.jhipster.sample.web.rest.searchdto;

/**
 * QarobotSearchDTO
 */
public class MediaTypeSearchDTO {

    private String query;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    @Override
    public String toString() {
        return "MediaTypeSearch [query=" + query + "]";
    }

    
}