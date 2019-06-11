package io.github.jhipster.sample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Disease Branch is used to contain mutiple disease maps, and could contain
 * subDisease map.
 */
@Entity
@Table(name = "disease_branch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DiseaseBranch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @OneToMany(cascade = CascadeType.ALL
        , orphanRemoval = true,
        fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_branch_id")
    private List<DiseaseMap> diseaseMaps = new ArrayList<DiseaseMap>();


    public DiseaseBranch() {
    }

    public DiseaseBranch(Long id, String name, List<DiseaseMap> diseaseMaps) {
        this.id = id;
        this.name = name;
        this.diseaseMaps = diseaseMaps;
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

    public DiseaseBranch id(Long id) {
        this.id = id;
        return this;
    }

    public DiseaseBranch name(String name) {
        this.name = name;
        return this;
    }

    public DiseaseBranch diseaseMaps(List<DiseaseMap> diseaseMaps) {
        this.diseaseMaps = diseaseMaps;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DiseaseBranch)) {
            return false;
        }
        DiseaseBranch diseaseBranch = (DiseaseBranch) o;
        return Objects.equals(id, diseaseBranch.id) && Objects.equals(name, diseaseBranch.name) && Objects.equals(diseaseMaps, diseaseBranch.diseaseMaps);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, diseaseMaps);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", diseaseMaps='" + getDiseaseMaps() + "'" +
            "}";
    }

}
