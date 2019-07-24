package io.github.jhipster.sample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Disease Map is used to contain mutiple diseases and qarobot, and could contain
 * subDisease map.
 */
@Entity
@Table(name = "disease_map")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "diseasemap")
public class DiseaseMap implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @OneToMany(
        mappedBy = "parentDiseaseMap",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY)
    // @JoinColumn(name = "disease_map_id")
    private List<DiseaseMap> diseaseMaps;

    @ManyToOne
    @JoinColumn(name = "disease_map_id")
    // @JsonIgnoreProperties("diseaseMaps")
    private DiseaseMap parentDiseaseMap;

    // @ManyToOne
    // @JoinColumn(name = "disease_branch_id")
    // @JsonIgnoreProperties("diseaseMaps")
    // private DiseaseBranch parentDiseaseBranch;

    @ManyToMany(cascade = CascadeType.PERSIST,
        fetch = FetchType.EAGER)
    @JoinTable(name = "disease_map_q_arobot"
        , joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id"))
    private Set<QArobot> qarobots = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST,
        fetch = FetchType.EAGER)
    @JoinTable(name = "disease_map_disease_xi_an"
        , joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"))
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();


    public DiseaseMap() {
    }



    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<DiseaseMap> getDiseaseMaps() {
        return this.diseaseMaps;
    }

    public void setDiseaseMaps(List<DiseaseMap> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
    }



    public Set<DiseaseXiAn> getDiseaseXiAns() {
        return this.diseaseXiAns;
    }

    public void setDiseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
    }

    public DiseaseMap getParentDiseaseMap() {
        return parentDiseaseMap;
    }

    public void setParentDiseaseMap(DiseaseMap parentDiseaseMap) {
        this.parentDiseaseMap = parentDiseaseMap;
    }

    public DiseaseMap id(Long id) {
        this.id = id;
        return this;
    }

    public DiseaseMap name(String name) {
        this.name = name;
        return this;
    }

    public DiseaseMap diseaseMaps(List<DiseaseMap> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
        return this;
    }

    public DiseaseMap qArobots(Set<QArobot> qArobots) {
        this.qarobots = qArobots;
        return this;
    }

    public DiseaseMap diseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
        return this;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((diseaseMaps == null) ? 0 : diseaseMaps.hashCode());
        result = prime * result + ((diseaseXiAns == null) ? 0 : diseaseXiAns.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        // result = prime * result + ((parentDiseaseBranch == null) ? 0 : parentDiseaseBranch.hashCode());
        result = prime * result + ((parentDiseaseMap == null) ? 0 : parentDiseaseMap.hashCode());
        result = prime * result + ((qarobots == null) ? 0 : qarobots.hashCode());
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
        DiseaseMap other = (DiseaseMap) obj;
        if (diseaseMaps == null) {
            if (other.diseaseMaps != null)
                return false;
        } else if (!diseaseMaps.equals(other.diseaseMaps))
            return false;
        if (diseaseXiAns == null) {
            if (other.diseaseXiAns != null)
                return false;
        } else if (!diseaseXiAns.equals(other.diseaseXiAns))
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        // if (parentDiseaseBranch == null) {
        //     if (other.parentDiseaseBranch != null)
        //         return false;
        // } else if (!parentDiseaseBranch.equals(other.parentDiseaseBranch))
        //     return false;
        if (parentDiseaseMap == null) {
            if (other.parentDiseaseMap != null)
                return false;
        } else if (!parentDiseaseMap.equals(other.parentDiseaseMap))
            return false;
        if (qarobots == null) {
            if (other.qarobots != null)
                return false;
        } else if (!qarobots.equals(other.qarobots))
            return false;
        return true;
    }





    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", diseaseMaps='" + getDiseaseMaps() + "'" +
            ", qArobots='" + getQArobots() + "'" +
            ", diseaseXiAns='" + getDiseaseXiAns() + "'" +
            "}";
    }

    // public DiseaseBranch getParentDiseaseBranch() {
    //     return parentDiseaseBranch;
    // }

    // public void setParentDiseaseBranch(DiseaseBranch parentDiseaseBranch) {
    //     this.parentDiseaseBranch = parentDiseaseBranch;
    // }

    public DiseaseMap(Long id, @Size(max = 50) String name, List<DiseaseMap> diseaseMaps, DiseaseMap parentDiseaseMap,
            DiseaseBranch parentDiseaseBranch, Set<QArobot> qArobots, Set<DiseaseXiAn> diseaseXiAns) {
        this.id = id;
        this.name = name;
        this.diseaseMaps = diseaseMaps;
        this.parentDiseaseMap = parentDiseaseMap;
        this.parentDiseaseBranch = parentDiseaseBranch;
        this.qarobots = qArobots;
        this.diseaseXiAns = diseaseXiAns;
    }

    public Set<QArobot> getQarobots() {
        return qarobots;
    }

    public void setQarobots(Set<QArobot> qarobots) {
        this.qarobots = qarobots;
    }

}
