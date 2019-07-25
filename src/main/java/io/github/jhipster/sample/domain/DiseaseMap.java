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
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY)
    @JsonIgnoreProperties("parentDiseaseMap")
    @JoinColumn(name = "disease_map_id")
    private List<DiseaseMap> diseaseMaps;

    @ManyToOne
    @JsonIgnoreProperties("diseaseMaps")
    @JoinColumn(name = "disease_map_id")
    // @JsonIgnoreProperties("diseaseMaps")
    private DiseaseMap parentDiseaseMap;

    @ManyToOne
    @JoinColumn(name = "disease_branch_id")
    private DiseaseBranch parentDiseaseBranch;

    @ManyToMany(cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.REFRESH,
            CascadeType.PERSIST
        },
        fetch = FetchType.EAGER)
    @JoinTable(name = "disease_map_q_arobot"
        , joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id"))
    private Set<QArobot> qarobots = new HashSet<>();

    @ManyToMany(
        cascade = { CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.PERSIST },
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
        return Objects.hashCode(getId());
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
        return true;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", qArobots='" + getQarobots() + "'" +
            ", diseaseXiAns='" + getDiseaseXiAns() + "'" +
            "}";
    }

    public DiseaseBranch getParentDiseaseBranch() {
        return parentDiseaseBranch;
    }

    public void setParentDiseaseBranch(DiseaseBranch parentDiseaseBranch) {
        this.parentDiseaseBranch = parentDiseaseBranch;
    }

    public Set<QArobot> getQarobots() {
        return qarobots;
    }

    public void setQarobots(Set<QArobot> qarobots) {
        this.qarobots = qarobots;
    }

}
