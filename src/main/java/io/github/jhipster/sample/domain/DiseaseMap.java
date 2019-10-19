package io.github.jhipster.sample.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Disease Map is used to contain mutiple diseases and qarobot, and could
 * contain subDisease map.
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

    @Size(max = 50)
    @Column(name = "subsidiary", length = 50)
    private String subsidiary = "待添加";

    @Size(max = 250)
    @Column(name = "description", length = 250)
    private String description = "待添加";

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("parentDiseaseMap")
    @JoinColumn(name = "disease_map_id")
    @BatchSize(size = 5)
    private List<DiseaseMap> diseaseMaps;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @BatchSize(size = 5)
    @JoinColumn(name = "disease_map_id")
    private Set<LinkCard> linkCards = new HashSet<LinkCard>();

    @ManyToOne
    @JsonIgnoreProperties("diseaseMaps")
    @JoinColumn(name = "disease_map_id")
    private DiseaseMap parentDiseaseMap;

    @ManyToOne
    @JoinColumn(name = "disease_branch_id")
    private DiseaseBranch parentDiseaseBranch;

    @ManyToMany
    @JoinTable(name = "disease_map_q_arobot", joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "q_arobot_id", referencedColumnName = "id"))
    @BatchSize(size = 5)
    private Set<QArobot> qarobots = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "disease_map_disease_xi_an", joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "disease_xi_an_id", referencedColumnName = "id"))
    @BatchSize(size = 5)
    private Set<DiseaseXiAn> diseaseXiAns = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "disease_map_user",
        joinColumns = @JoinColumn(name = "disease_map_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> users = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private DiseaseMapType type;

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
        return "{" + " id='" + getId() + "'" + ", name='" + getName() + "'" + ", qArobots='" + getQarobots() + "'"
                + ", diseaseXiAns='" + getDiseaseXiAns() + "'" + "}";
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

    public String getSubsidiary() {
        return subsidiary;
    }

    public void setSubsidiary(String subsidiary) {
        this.subsidiary = subsidiary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<LinkCard> getLinkCards() {
        return linkCards;
    }

    public void setLinkCards(Set<LinkCard> linkCards) {
        this.linkCards = linkCards;
    }

    public DiseaseMapIndexDTO toIndexDTO() {
        DiseaseMapIndexDTO dto = new DiseaseMapIndexDTO();
        dto.setDescription(this.description);
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setSubsidiary(this.subsidiary);
        return dto;
    }

    public DiseaseMap update(DiseaseMap diseaseMap) {
        this.id = diseaseMap.id;
        this.name = diseaseMap.name;
        this.subsidiary = diseaseMap.subsidiary;
        this.description = diseaseMap.description;
        this.type = diseaseMap.type;
        return this;
    }

    public DiseaseMapType getType() {
        return type;
    }

    public void setType(DiseaseMapType type) {
        this.type = type;
    }

}
