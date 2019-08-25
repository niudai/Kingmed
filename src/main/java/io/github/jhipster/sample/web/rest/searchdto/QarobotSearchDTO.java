package io.github.jhipster.sample.web.rest.searchdto;

/**
 * QarobotSearchDTO
 */
public class QarobotSearchDTO {

    private String query;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    @Override
    public String toString() {
        return "QarobotSearchDTO [query=" + query + "]";
    }

    
}