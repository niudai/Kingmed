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
 * Disease Map is used to contain mutiple diseases and qarobot, and could contain
 * subDisease map.
 */
@Entity
@Table(name = "disease_map")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DiseaseMap implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @OneToMany(cascade = CascadeType.ALL
        , orphanRemoval = true,
        fetch = FetchType.EAGER)
    @JoinColumn(name = "disease_map_id")
    private List<DiseaseMap> diseaseMaps = new ArrayList<DiseaseMap>();

    @ManyToMany(cascade = CascadeType.PERSIST,
        fetch = FetchType.EAGER)
    @JoinTable(name = "disease_map_q_arobot"
        , joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id"))
    private Set<QArobot> qArobots = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST,
        fetch = FetchType.EAGER)
    @JoinTable(name = "disease_map_disease_xi_an"
        , joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id")
        , inverseJoinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"))
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();


    public DiseaseMap() {
    }

    public DiseaseMap(Long id, String name, List<DiseaseMap> diseaseMaps, Set<QArobot> qArobots, Set<DiseaseXiAn> diseaseXiAns) {
        this.id = id;
        this.name = name;
        this.diseaseMaps = diseaseMaps;
        this.qArobots = qArobots;
        this.diseaseXiAns = diseaseXiAns;
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

    public Set<QArobot> getQArobots() {
        return this.qArobots;
    }

    public void setQArobots(Set<QArobot> qArobots) {
        this.qArobots = qArobots;
    }

    public Set<DiseaseXiAn> getDiseaseXiAns() {
        return this.diseaseXiAns;
    }

    public void setDiseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
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
        this.qArobots = qArobots;
        return this;
    }

    public DiseaseMap diseaseXiAns(Set<DiseaseXiAn> diseaseXiAns) {
        this.diseaseXiAns = diseaseXiAns;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DiseaseMap)) {
            return false;
        }
        DiseaseMap diseaseMap = (DiseaseMap) o;
        return Objects.equals(id, diseaseMap.id) && Objects.equals(name, diseaseMap.name) && Objects.equals(diseaseMaps, diseaseMap.diseaseMaps) && Objects.equals(qArobots, diseaseMap.qArobots) && Objects.equals(diseaseXiAns, diseaseMap.diseaseXiAns);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, diseaseMaps, qArobots, diseaseXiAns);
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

}
