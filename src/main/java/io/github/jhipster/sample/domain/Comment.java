package io.github.jhipster.sample.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Comment
 */
@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 600)
    private String comment;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private DiseaseXiAn diseaseXiAn;

    @JsonIgnore
    @Column(name = "disease_xi_an_id")
    private Long diseaseXiAnId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Comment [comment=" + comment + ", id=" + id + "]";
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((comment == null) ? 0 : comment.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Comment other = (Comment) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    public DiseaseXiAn getDiseaseXiAn() {
        return diseaseXiAn;
    }

    public void setDiseaseXiAn(DiseaseXiAn diseaseXiAn) {
        this.diseaseXiAn = diseaseXiAn;
    }

    public Long getDiseaseXiAnId() {
        return diseaseXiAnId;
    }

    public void setDiseaseXiAnId(Long diseaseXiAnId) {
        this.diseaseXiAnId = diseaseXiAnId;
    }


}
